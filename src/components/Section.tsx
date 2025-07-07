import type { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
    return <section className="min-h-24">
        {children}
    </section>
}