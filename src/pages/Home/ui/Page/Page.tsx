import type { ReactNode } from "react";

function Section({ id, children }: { id: string, children: ReactNode }) {
  return <section id={id} className="min-h-96 flex flex-col justify-center items-start px-2 md:px-8 lg:px-32 xl:px-128 py-24">
    {children}
  </section>
}

function CustomLink({ href, children }: { href: string, children: ReactNode }) {
  return <a href={href} className="border-b-2 border-indigo-400 hover:text-indigo-400 transition-all duration-100">
    {children}
  </a>
}

function Emphasis({ children }: { children: ReactNode }) {
  return <span className="text-indigo-400">
    {children}
  </span>
}


export default function App() {
  return (
    <main>
      <header className="py-24 flex flex-col flex-justify-center items-center gap-1">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Spinize</h1>
        <p className="text-gray-400">Spinize is a sleek and modern Subsonic music client for streaming your personal music collection anytime, anywhere.</p>
        <p className="text-indigo-400 text-sm">(currently in beta)</p>
      </header>

      <nav>
        <ul className="flex flex-row gap-2 md:gap-4 lg:gap-8 xl:gap-16 justify-center items-center">
          <li>
            <CustomLink href='#'>
              Homepage
            </CustomLink>
          </li>
          <li>
            <CustomLink href='#why-spinize'>
              Why Spinize?
            </CustomLink>
          </li>
          <li>
            <CustomLink href='https://open.spinize.app/'>
              Open web app
            </CustomLink>
          </li>
          <li>
            <CustomLink href='#about'>
              More about the Spinize project
            </CustomLink>
          </li>
        </ul>
      </nav>

      <Section id="why-spinize">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Why <Emphasis>Spinize</Emphasis>?</h2>
        <p className="text-gray-400">Spinize is a <b>free</b> subsonic client, compatible with Navidrome and <b>any subsonic compatible server</b>.</p>
        <p className="text-gray-400">Spinize offers an intuitive <b>user experience</b> and a pleasant <b>user interface</b>, because Music is meant to be art, and so should its client.</p>
      </Section>

      <Section id="about">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">More about the <Emphasis>Spinize project</Emphasis></h2>
        <p className="text-gray-400">Spinize was made because open source music servers need a nice <b>user interface</b> coupled with a nice <b>user experience</b>.</p>
        <p className="text-gray-400">This is why I started developing Spinize, and made it <b>free to use</b>.</p>
      </Section>

      <footer className="flex flex-col gap-1 justify-center items-center pb-16">
        <p>2025 The Spinize Project - a music client for subsonic servers.</p>
      </footer>
    </main>
  );
}
