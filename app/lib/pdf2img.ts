// app/lib/pdf2img.ts

// Define the return type
export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

// Load pdf.js dynamically
async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Worker file must exist in your public/ folder
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

// Convert first page of PDF to PNG image
export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    try {
        const pdfjsLib = await loadPdfJs();

        // Read PDF into ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        // Get first page
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        // Render page into canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        // Convert canvas to Blob → File
        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/png");
        });
        if (!blob) throw new Error("Failed to create image blob");

        const imageFile = new File([blob], "resume.png", { type: "image/png" });

        return {
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
        };
    } catch (err: any) {
        return { imageUrl: "", file: null, error: err.message };
    }
}
