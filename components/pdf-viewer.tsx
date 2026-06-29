"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";

// Configure worker for PDF.js using an external CDN to avoid Next.js build config issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Update width on resize
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Auto-calculate scale based on screen width for mobile
  const calculatedWidth = width < 640 ? width - 32 : 600;

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#151B28] overflow-y-auto pt-4 pb-20">
      
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between w-full max-w-2xl px-4 py-3 mb-4 bg-[#1E2433] border border-[#2A3142] rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="w-8 h-8 border-[#2A3142] bg-[#151B28] hover:bg-[#2A3142]"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-white min-w-[70px] text-center">
            {pageNumber} / {numPages || "-"}
          </span>
          <Button 
            variant="outline" 
            size="icon"
            className="w-8 h-8 border-[#2A3142] bg-[#151B28] hover:bg-[#2A3142]"
            onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
            disabled={pageNumber >= (numPages || 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="w-8 h-8 border-[#2A3142] bg-[#151B28] hover:bg-[#2A3142]"
            onClick={() => setScale(scale - 0.2)}
            disabled={scale <= 0.6}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs font-medium text-white min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button 
            variant="outline" 
            size="icon"
            className="w-8 h-8 border-[#2A3142] bg-[#151B28] hover:bg-[#2A3142]"
            onClick={() => setScale(scale + 0.2)}
            disabled={scale >= 2.5}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Document Viewer */}
      <div className="flex justify-center w-full max-w-2xl px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <Document 
            file={url} 
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center p-12 text-[#151B28]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-medium text-sm">Memuat PDF...</p>
              </div>
            }
            error={
              <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">
                Gagal memuat PDF. Format file tidak didukung atau rusak.
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              width={calculatedWidth} 
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
              className="max-w-full"
            />
          </Document>
        </div>
      </div>
      
    </div>
  );
}
