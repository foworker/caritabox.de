"use client";
import { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";
import { TbRefreshDot } from "react-icons/tb";

import { Button } from "@/components/ui/button";

export const ClientSignature = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
      });
    }
  }, [canvasRef, signaturePadRef]);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataURL = signaturePadRef.current.toDataURL();
      // console.log("dataURL: ", dataURL);
    }
  };

  return (
    <div className="flex max-w-sm flex-col space-y-4">
      <h3 className="textxl">Unterschrift</h3>
      <canvas
        ref={canvasRef}
        width="400"
        height="200"
        onClick={saveSignature}
        onTouchEnd={saveSignature}
        className="rounded-md border bg-slate-100 dark:bg-slate-300"
      />
      <Button asChild variant="ghost" onClick={clearSignature} size="sm">
        <div className="flex flex-row items-center gap-x-3">
          <TbRefreshDot size={24} />
          Eingabe wiederholen
        </div>
      </Button>
    </div>
  );
};
function checkSignature(this: HTMLCanvasElement, ev: MouseEvent) {
  throw new Error("Function not implemented.");
}
