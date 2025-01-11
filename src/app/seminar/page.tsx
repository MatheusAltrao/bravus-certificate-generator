'use client';

import { BeltsProps } from "@/utils/beltsname";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import Certificado from '../../assets/certificado-bravus-seminario.svg'
import Form from "@/components/form/Index";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function Seminar() {
  const [name, setName] = useState('Matheus A. Quinquinato');
  const [uiTopPosition, setUiTopPosition] = useState('top-[200px]');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleExportPDF = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setUiTopPosition('top-[180px]');
      setTimeout(async () => {
        if (contentRef.current) {
          const canvas = await html2canvas(contentRef.current);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape');
          const pdfName = name  + '.pdf';

          const pageWidth = 297;
          const pageHeight = 210;

          pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
          pdf.save(pdfName);

          setUiTopPosition('top-[200px]');
        } else {
          console.error('Document not ready for PDF generation');
        }
      }, 0);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setUiTopPosition('top-[200px]');
    }
  };
  return (
    <main className="p-10 flex items-center justify-center flex-col ">
      <div className="max-w-[842px] mx-auto">
        <div
          ref={contentRef}
          className="relative "
        >
          <Image
            src={Certificado}
            width={0}
            height={0}
            className="h-auto w-full object-cover "
            sizes="100vw"
            alt={'certificado'}
            priority={true}
          />

          <div className={`w-full  text-center absolute ${uiTopPosition}`}>
            <p className="text-3xl name  ">{name}</p>
          </div>

        
        </div>

        <form
      onSubmit={handleExportPDF}
      className="p-4 flex-col flex gap-4"
    >
      <div>
        <Label>Nome do aluno:</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="studantName"
          placeholder="Matheus Altrão"
        />
      </div>
      

      <Button variant={'pdf'}> Gerar PDF</Button>
    </form>
      </div>
    </main>
  );
}
