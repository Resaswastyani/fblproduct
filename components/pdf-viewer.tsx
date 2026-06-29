"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  // Initialize directly from matchMedia so first render is already correct on iOS
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect touch device (iOS, Android, iPad) via pointer media query
  // `pointer: coarse` = touch screen, `pointer: fine` = mouse/trackpad
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track container width
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

  // Desktop: scroll-based page tracking
  const handleScroll = useCallback(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container || pageRefs.current.length === 0) return;

    const containerMid = container.scrollTop + container.clientHeight / 2;
    let closestPage = 1;
    let closestDistance = Infinity;

    pageRefs.current.forEach((el, i) => {
      if (!el) return;
      const elMid = el.offsetTop + el.offsetHeight / 2;
      const distance = Math.abs(containerMid - elMid);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPage = i + 1;
      }
    });

    setCurrentPage(closestPage);
  }, [isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile, numPages]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setCurrentPage(1);
    pageRefs.current = new Array(numPages).fill(null);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }

  const pageWidth = containerWidth > 0 ? containerWidth * scale : undefined;

  const goToPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage(p => Math.min(numPages, p + 1));

  return (
    <div className="flex flex-col w-full h-full bg-[#0D1117] overflow-hidden">

      {/* Toolbar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-[#2A3142]">
        <span className="text-sm font-medium text-white/70 tabular-nums">
          Halaman <span className="text-white font-bold">{currentPage}</span> / {numPages || "—"}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale(prev => Math.max(0.5, parseFloat((prev - 0.1).toFixed(1))))}
            disabled={scale <= 0.5}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="px-2 py-1 text-xs font-mono font-semibold text-white/70 hover:text-white hover:bg-[#2A3142] rounded-lg transition-colors min-w-[46px] text-center"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={() => setScale(prev => Math.min(3, parseFloat((prev + 0.1).toFixed(1))))}
            disabled={scale >= 3}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── MOBILE: single page + prev/next buttons ── */}
      {isMobile ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Single page viewer */}
          <div className="flex-1 overflow-y-auto flex justify-center items-start py-4 bg-[#0D1117]"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex flex-col items-center pt-24 gap-4">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-white/50">Memuat PDF...</p>
                </div>
              }
              error={
                <div className="mt-12 mx-4 p-6 text-center text-red-400 bg-red-950/30 border border-red-800 rounded-xl">
                  Gagal memuat PDF.
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                width={containerWidth > 0 ? containerWidth - 16 : undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl rounded-md overflow-hidden bg-white"
                loading={
                  <div
                    className="bg-[#1E2433] rounded-md animate-pulse mx-2"
                    style={{ width: (containerWidth || 300) - 16, height: ((containerWidth || 300) - 16) * 1.414 }}
                  />
                }
              />
            </Document>
          </div>

          {/* Mobile bottom nav */}
          <div className="flex-shrink-0 flex items-center justify-between gap-3 px-4 py-3 bg-[#161B22] border-t border-[#2A3142]">
            <button
              onClick={goToPrev}
              disabled={currentPage <= 1}
              className="flex-1 py-2.5 rounded-xl bg-[#2A3142] hover:bg-[#3A4152] active:bg-[#4A5162] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>
            <span className="text-xs text-white/50 tabular-nums shrink-0 font-medium">
              {currentPage}/{numPages || "—"}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage >= numPages}
              className="flex-1 py-2.5 rounded-xl bg-[#2962FF] hover:bg-[#1a4fd9] active:bg-[#1040c0] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Berikutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: all pages scrollable ── */
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-4 py-4 bg-[#0D1117]"
          style={{ scrollBehavior: "smooth" }}
        >
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center pt-24 gap-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-white/50">Memuat PDF...</p>
              </div>
            }
            error={
              <div className="mt-24 mx-4 p-6 text-center text-red-400 bg-red-950/30 border border-red-800 rounded-xl">
                <p className="font-semibold mb-1">Gagal memuat PDF</p>
                <p className="text-sm text-red-400/70">Format tidak didukung atau link sudah kadaluarsa.</p>
              </div>
            }
          >
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
      )}
    </div>
  );
}
