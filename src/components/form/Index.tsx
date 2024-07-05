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
import { jiuJitsuBelts } from '@/utils/beltsname';
import { FormEvent } from 'react';

interface FormProps {
  name: string;
  setName: (v: string) => void;
  dateAndLocal: string;
  setDateAndLocal: (v: string) => void;
  setBelt: (v: { name: string; color1: string; color2: string; alignment: string }) => void;
  handleExportPDF: (e: FormEvent) => Promise<void>;
}

const Form = ({
  name,
  setName,
  dateAndLocal,
  setDateAndLocal,
  setBelt,
  handleExportPDF,
}: FormProps) => {
  const handleBeltChange = (value: string) => {
    const selectedBelt = jiuJitsuBelts.find((belt) => belt.name === value);
    if (selectedBelt) {
      setBelt(selectedBelt);
    }
  };

  return (
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
            {jiuJitsuBelts.map((belt, index) => (
              <div key={index}>
                <SelectItem value={belt.name}>{belt.name}</SelectItem>
              </div>
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
  );
};

export default Form;
