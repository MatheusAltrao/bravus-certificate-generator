'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BeltsProps, jiuJitsuBelts } from '@/utils/beltsname';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';
import Certificado from '../assets/certificado.svg';

export default function Home() {
  const [name, setName] = useState('Matheus A. Quinquinato');
  const [belt, setBelt] = useState<BeltsProps>({
    name: 'Faixa Cinza e Branca',
    color1: '#949599',
    color2: '#000',
  });
  const [dateAndLocal, setDateAndLocal] = useState('Três Lagoas, Julho de 2024');
  const [uiPadding, setUiPadding] = useState('pb-0');
  const [uiTopPosition, setUiTopPosition] = useState('top-[285px]');

  function handleBeltChange(value: string) {
    const selectedBelt = jiuJitsuBelts.find((belt) => belt.name === value);
    if (selectedBelt) {
      setBelt(selectedBelt);
    }
  }

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleExportPDF = async (e: FormEvent) => {
    e.preventDefault();

    setUiPadding('pb-8');
    setUiTopPosition('top-[270px]');
    setTimeout(async () => {
      if (contentRef.current) {
        const canvas = await html2canvas(contentRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        const pdfName = name + belt.name + '.pdf';

        const pageWidth = 297;
        const pageHeight = 210;

        const imgWidth = pageWidth;
        const imgHeight = pageHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(pdfName);

        // Restaura o estado original após gerar o PDF
        setUiPadding('pb-0');
        setUiTopPosition('top-[285px]');
      } else {
        console.error('Document not ready for PDF generation');
      }
    }, 0);
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

          <div
            style={{ background: belt.color1 }}
            className={`h-[66px] absolute left-[120px] top-[371px] w-[450px] flex items-center justify-center `}
          >
            <p className={`text-4xl text-white belt-name ${uiPadding}`}>{belt.name}</p>
          </div>

          <div
            style={{ background: belt.color2 }}
            className={`h-[66px] absolute right-[152px]   top-[371px] text-white w-[120px] flex items-center justify-center `}
          />

          <div
            style={{ background: belt.color1 }}
            className="h-[66px] absolute right-[110px] top-[371px] w-[42px] "
          />
          <p className="absolute bottom-[70px] left-0 right-0 text-center font-bold text-xs">
            {dateAndLocal}
          </p>
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
          <div>
            <Label>Cor da faixa:</Label>
            <Select onValueChange={handleBeltChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Faixas" />
              </SelectTrigger>
              <SelectContent>
                {jiuJitsuBelts.map((belt) => (
                  <SelectItem
                    key={belt.name}
                    value={belt.name}
                  >
                    {belt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Data e local</Label>
            <Input
              value={dateAndLocal}
              onChange={(e) => setDateAndLocal(e.target.value)}
              name="dateAndLocal"
              placeholder="local, mês ano"
            />
          </div>

          <Button variant={'pdf'}> Gerar PDF</Button>
        </form>
      </div>
    </main>
  );
}
