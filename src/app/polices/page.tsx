'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';
import { withMask } from 'use-mask-input';
import Certificado from '../../assets/certificado-bravus-policial.svg';

const Polices = () => {
  const [topPositioName, setTopPositionName] = useState('top-[295px]');
  const [topPositioCpf, setTopPositionCpf] = useState('top-[338px]');
  const [topPositioCurseNumber, setTopPositionCurseNumber] = useState('top-[364px]');

  const contentRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState('Matheus A. Quinquinato');
  const [cpf, setCpf] = useState('468.882.708-31');
  const [curseNumber, setCurseNumber] = useState('5');

  const handleExportPDF = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setTopPositionName('top-[283px]');
      setTopPositionCpf('top-[328px]');
      setTopPositionCurseNumber('top-[355px]');

      setTimeout(async () => {
        if (contentRef.current) {
          const canvas = await html2canvas(contentRef.current);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape');
          const pdfName = name + '.pdf';

          const pageWidth = 297;
          const pageHeight = 210;

          pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
          pdf.save(pdfName);
          setTopPositionName('top-[295px]');
          setTopPositionCpf('top-[338px]');
          setTopPositionCurseNumber('top-[362px]');
        } else {
          console.error('Document not ready for PDF generation');
        }
      }, 0);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setTopPositionName('top-[295px]');
      setTopPositionCpf('top-[338px]');
      setTopPositionCurseNumber('top-[362px]');
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

          <div
            className={`text-[#393A4D]  font-medium text-2xl name w-[488px] text-center   absolute  ${topPositioName} left-[180px] `}
          >
            <p>{name}</p>
          </div>

          <div
            className={`text-[#393A4D] font-medium text-lg w-[215px] text-center absolute ${topPositioCpf} left-[410px]`}
          >
            <p>{cpf}</p>
          </div>

          <div
            className={` text-[#393A4D] font-medium text-lg w-[22px] text-right absolute ${topPositioCurseNumber}  top-[362px] left-[253px]`}
          >
            <p>{curseNumber}</p>
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
              name="name"
              placeholder="Matheus Altrão"
            />
          </div>

          <div>
            <Label>CPF do aluno:</Label>
            <Input
              ref={withMask('999.999.999-99')}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              name="cpf"
              placeholder="468.882.708-31"
              type="text"
            />
          </div>

          <div>
            <Label>Número do curso</Label>
            <Input
              value={curseNumber}
              onChange={(e) => setCurseNumber(e.target.value)}
              name="curseNumber"
              placeholder="3"
            />
          </div>

          <Button variant={'pdf'}> Gerar PDF</Button>
        </form>
      </div>
    </main>
  );
};

export default Polices;
