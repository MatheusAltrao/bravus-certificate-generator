'use client';
import ActiveLink from './active-link';

interface HeaderProps {
  href: string;
}

const Header = () => {
  return (
    <header className=" max-w-[820px] mx-auto flex items-center justify-between pt-10 ">
      <h2 className="text-xl font-black">Bravus Certificados</h2>

      <div className="flex items-center gap-2 text-sm ">
        <ActiveLink
          href="/"
          icon={''}
          name="Alunos"
        />
        <ActiveLink
          href="/polices"
          icon={''}
          name="Policiais"
        />
        <ActiveLink
          href="/seminar"
          icon={''}
          name="Seminário"
        />
      </div>
    </header>
  );
};

export default Header;
