"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker for PDF.js using an external CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track container width with ResizeObserver
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Calculate which page is currently most visible using scroll position
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || pageRefs.current.length === 0) return;

    const containerTop = container.scrollTop;
    const containerMid = containerTop + container.clientHeight / 2;

    let closestPage = 1;
    let closestDistance = Infinity;

    pageRefs.current.forEach((el, i) => {
      if (!el) return;
      const elTop = el.offsetTop;
      const elMid = elTop + el.offsetHeight / 2;
      const distance = Math.abs(containerMid - elMid);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPage = i + 1;
      }
    });

    setCurrentPage(closestPage);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, numPages]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setCurrentPage(1);
    pageRefs.current = new Array(numPages).fill(null);
    // Reset scroll to top when document loads
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }

  const pageWidth = containerWidth > 0 ? containerWidth * scale : undefined;

  return (
    <div className="flex flex-col w-full h-full bg-[#0D1117] overflow-hidden">

      {/* Sticky Toolbar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-[#2A3142]">
        {/* Page indicator */}
        <span className="text-sm font-medium text-white/70 tabular-nums">
          Halaman <span className="text-white font-bold">{currentPage}</span> / {numPages || "—"}
        </span>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale(prev => Math.max(0.5, parseFloat((prev - 0.1).toFixed(1))))}
            disabled={scale <= 0.5}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
            title="Perkecil"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="px-2 py-1 text-xs font-mono font-semibold text-white/70 hover:text-white hover:bg-[#2A3142] rounded-lg transition-colors min-w-[46px] text-center"
            title="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={() => setScale(prev => Math.min(3, parseFloat((prev + 0.1).toFixed(1))))}
            disabled={scale >= 3}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
            title="Perbesar"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable PDF Content — all pages rendered, scroll to read */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-4 py-4 bg-[#0D1117]"
        style={{ 
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
        }}
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center pt-24 gap-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-white/50 font-medium">Memuat PDF...</p>
            </div>
          }
          error={
            <div className="mt-24 mx-4 p-6 text-center text-red-400 bg-red-950/30 border border-red-800 rounded-xl">
              <p className="font-semibold mb-1">Gagal memuat PDF</p>
              <p className="text-sm text-red-400/70">Format tidak didukung atau link sudah kadaluarsa.</p>
            </div>
          }
        >
          {/* Render ALL pages one by one so user can scroll */}
          {numPages > 0 &&
            Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                ref={(el) => { pageRefs.current[i] = el; }}
                className="w-full flex justify-center"
              >
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-2xl rounded-md overflow-hidden bg-white"
                  loading={
                    <div
                      className="bg-[#1E2433] rounded-md animate-pulse"
                      style={{ width: pageWidth, height: (pageWidth ?? 400) * 1.414 }}
                    />
                  }
                />
              </div>
            ))
          }
        </Document>

        {numPages > 0 && (
          <p className="text-xs text-white/30 pb-4">— Akhir Dokumen —</p>
        )}
      </div>
    </div>
  );
}
