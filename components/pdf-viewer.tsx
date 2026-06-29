"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker for PDF.js using an external CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const pageWidth = containerWidth > 0 ? containerWidth * scale : undefined;

  return (
    <div className="flex flex-col w-full h-full bg-[#0D1117] overflow-hidden">

      {/* Sticky Toolbar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-[#2A3142]">
        {/* Page Navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-white/80 min-w-[64px] text-center tabular-nums">
            {pageNumber} / {numPages ?? "—"}
          </span>
          <button
            onClick={() => setPageNumber(Math.min(numPages ?? 1, pageNumber + 1))}
            disabled={pageNumber >= (numPages ?? 1)}
            className="p-1.5 rounded-lg hover:bg-[#2A3142] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Controls */}
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

      {/* Scrollable PDF Content — fills ALL remaining height */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-auto flex flex-col items-center py-4 gap-4 bg-[#0D1117]"
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
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl rounded-md overflow-hidden bg-white"
          />
        </Document>
      </div>

      {/* Bottom pagination bar for easier mobile swiping */}
      <div className="flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 bg-[#161B22] border-t border-[#2A3142]">
        <button
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
          className="flex-1 py-2 rounded-xl bg-[#2A3142] hover:bg-[#3A4152] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Sebelumnya
        </button>
        <span className="text-xs text-white/50 tabular-nums shrink-0">
          {pageNumber}/{numPages ?? "—"}
        </span>
        <button
          onClick={() => setPageNumber(Math.min(numPages ?? 1, pageNumber + 1))}
          disabled={pageNumber >= (numPages ?? 1)}
          className="flex-1 py-2 rounded-xl bg-[#2A3142] hover:bg-[#3A4152] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          Berikutnya <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
