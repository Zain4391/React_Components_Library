import { useState, useRef, useEffect, type ReactNode } from "react";
import type { ToastVariant } from "./types/Toast.types";

import { Button } from "./components/primitive/Button";
import { Badge } from "./components/primitive/Badge";
import { Card } from "./components/primitive/Card";
import { Avatar } from "./components/primitive/Avatar";
import { Divider } from "./components/primitive/Divider";
import { Input } from "./components/primitive/Input";
import { Textarea } from "./components/primitive/Textarea";
import { Tooltip } from "./components/primitive/Tooltip";

import { Accordion } from "./components/composite/Accordion/Accordion";
import { Tabs } from "./components/composite/Tabs/Tabs";
import { Modal } from "./components/composite/Modal/Modal";
import { Dropdown } from "./components/composite/Dropdown/Dropdown";
import { Toast } from "./components/composite/Toast/Toast";
import { ActionCard } from "./components/composite/ActionCard";
import { ArticleCard } from "./components/composite/ArticleCard";
import { ProductCard } from "./components/composite/ProductCard";
import { PricingCard } from "./components/composite/PricingCard";
import { Navbar } from "./components/composite/Navbar";
import { Footer } from "./components/composite/Footer";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.35 6.5-1.5 6.5-7.14a5.8 5.8 0 0 0-1.6-3.8 5.36 5.36 0 0 0-.15-3.7s-1.28-.4-4 1.5a14.8 14.8 0 0 0-7 0c-2.72-1.9-4-1.5-4-1.5a5.36 5.36 0 0 0-.15 3.7 5.8 5.8 0 0 0-1.6 3.8c0 5.61 3.31 6.78 6.49 7.14a4.9 4.9 0 0 0-1.1 2.9V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-24 scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <h2
          className="text-2xl font-semibold text-(--color-text-primary) tracking-tight whitespace-nowrap"
          style={{ margin: 0 }}
        >
          {title}
        </h2>
        <div className="flex-1 h-px bg-(--color-border)" />
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

function Row({
  label,
  align = "center",
  children,
}: {
  label?: string;
  align?: "center" | "start";
  children: ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl border border-(--color-border) bg-(--color-surface) shadow-sm">
      {label && (
        <p className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-widest mb-4">
          {label}
        </p>
      )}
      <div className={`flex flex-wrap gap-4 items-${align}`}>{children}</div>
    </div>
  );
}

const COMPONENTS = [
  { id: "button", label: "Button" },
  { id: "badge", label: "Badge" },
  { id: "card", label: "Card" },
  { id: "avatar", label: "Avatar" },
  { id: "divider", label: "Divider" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
  { id: "tooltip", label: "Tooltip" },
  { id: "accordion", label: "Accordion" },
  { id: "tabs", label: "Tabs" },
  { id: "modal", label: "Modal" },
  { id: "dropdown", label: "Dropdown" },
  { id: "toast", label: "Toast" },
];

// ─── App ─────────────────────────────────────────────────────────────────────

type ToastEntry = { id: number; variant: ToastVariant; message: string };

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const [activeSection, setActiveSection] = useState<string>("button");
  const toastId = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );

    COMPONENTS.forEach((comp) => {
      const el = document.getElementById(comp.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLoadDemo = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };

  const addToast = (variant: ToastVariant, message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, variant, message }]);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 h-16 border-b border-(--color-border)"
        style={{
          backgroundColor: "var(--color-surface)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-(--color-accent) text-[var(--color-text-on-accent)] font-bold text-lg shadow-sm">
            C
          </div>
          <span className="text-base font-bold text-[var(--color-text-primary)] tracking-tight">
            Component Library
          </span>
          <div className="hidden sm:block">
            <Badge variant="olive" size="sm">
              v1.0
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            GitHub
          </Button>
          <Tooltip
            content={isDark ? "Switch to light" : "Switch to dark"}
            placement="bottom"
          >
            <button
              onClick={() => setIsDark((d) => !d)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-subtle)] transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 bg-transparent cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </Tooltip>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex max-w-[90rem] mx-auto w-full">
        {/* ── Sidebar ── */}
        <aside className="w-64 shrink-0 hidden lg:block border-r border-[var(--color-border)] p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 px-3">
            Components
          </h3>
          <nav className="flex flex-col gap-1">
            {COMPONENTS.map((comp) => (
              <a
                key={comp.id}
                href={`#${comp.id}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeSection === comp.id
                    ? "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {comp.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* ── Content ── */}
        <main className="flex-1 min-w-0 px-6 sm:px-12 md:px-24 py-16 pb-32">
          {/* ── Hero ── */}
          <div className="mb-20 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-6">
              Build accessible apps <br className="hidden sm:block" /> with
              speed.
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
              A curated collection of beautiful, reusable, and composable React
              components. Built with Tailwind CSS v4 and standard accessible
              HTML.
            </p>
            <div className="flex items-center gap-4 m-2">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("button")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse components
              </Button>
              <Button variant="secondary" size="lg">
                View source
              </Button>
            </div>
          </div>

          <div className="max-w-4xl">
            {/* ── Button ── */}
            <Section id="button" title="Button">
              <Row label="Variants">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </Row>
              <Row label="Sizes">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Row>
              <Row label="States">
                <Button isLoading={loadingBtn} onClick={handleLoadDemo}>
                  {loadingBtn ? "Loading…" : "Trigger load"}
                </Button>
                <Button>Left icon</Button>
                <Button variant="secondary">icon</Button>
                <Button variant="ghost">Both icons</Button>
                <Button disabled>Disabled</Button>
              </Row>
              <Row label="Full width">
                <Button fullWidth>Full width button</Button>
              </Row>
            </Section>

            {/* ── Badge ── */}
            <Section id="badge" title="Badge">
              <Row label="Variants">
                <Badge variant="default">Default</Badge>
                <Badge variant="olive">Olive</Badge>
                <Badge variant="burnt">Burnt</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </Row>
              <Row label="Sizes">
                <Badge variant="olive" size="sm">
                  Small
                </Badge>
                <Badge variant="olive" size="md">
                  Medium
                </Badge>
              </Row>
              <Row label="With dot">
                <Badge variant="success" dot>
                  Online
                </Badge>
                <Badge variant="danger" dot>
                  Offline
                </Badge>
                <Badge variant="warning" dot>
                  Away
                </Badge>
                <Badge variant="info" dot>
                  Syncing
                </Badge>
              </Row>
            </Section>

            {/* ── Card ── */}
            <Section id="card" title="Card">
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                Base Variants
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card
                  variant="default"
                  header={
                    <span className="text-sm font-semibold">Default</span>
                  }
                  footer={
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  }
                >
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Standard card with border, header, and footer.
                  </p>
                </Card>
                <Card
                  variant="elevated"
                  header={
                    <span className="text-sm font-semibold">Elevated</span>
                  }
                  footer={
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  }
                >
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Elevated card with a drop shadow for more prominence.
                  </p>
                </Card>
                <Card
                  variant="outlined"
                  header={
                    <span className="text-sm font-semibold">Outlined</span>
                  }
                  footer={
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  }
                >
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Outlined card — transparent background, strong border.
                  </p>
                </Card>
              </div>

              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                Compositions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Card */}
                <Card
                  variant="elevated"
                  coverImage={
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                      alt="Headphones"
                      className="w-full h-48 object-cover"
                    />
                  }
                  footer={
                    <div className="flex w-full items-center justify-between">
                      <span className="text-lg font-bold text-[var(--color-text-primary)]">
                        $299
                      </span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">Wireless Headphones</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Premium noise-canceling headphones with 30-hour battery
                      life and supreme comfort.
                    </p>
                  </div>
                </Card>

                {/* Interactive Action Card */}
                <ActionCard
                  title="Email Notifications"
                  description="Receive daily updates about your account activity, security alerts, and personalized recommendations."
                  actions={
                    <>
                      <Button size="sm" variant="secondary" className="flex-1">
                        Dismiss
                      </Button>
                      <Button size="sm" variant="primary" className="flex-1">
                        View all
                      </Button>
                    </>
                  }
                />

                {/* Article Card */}
                <ArticleCard
                  imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
                  imageAlt="Tech"
                  category="Development"
                  date="Apr 19, 2026"
                  readTime="8 min read"
                  title="Mastering Micro-frontends with React and Tailwind"
                  excerpt="Learn how to scale your web applications by breaking them down into manageable, independent pieces using modern architecture patterns."
                  authorName="Zain Rasool"
                  onReadMore={() => console.log("Read more clicked")}
                />
                {/* Product Card */}
                <ProductCard
                  imageSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"
                  imageAlt="Product"
                  title="Minimalist Analog Watch"
                  price="$129.00"
                  description="Matte Black / Leather Strap"
                  onAddToCart={() => console.log("Add to cart")}
                  onToggleFavorite={() => console.log("Toggle favorite")}
                />

                {/* Pricing Card */}
                <PricingCard
                  isPopular
                  badge="Most Popular"
                  title="Professional"
                  price="$49"
                  description="Perfect for growing teams and scaling startups."
                  features={[
                    "Unlimited Projects",
                    { name: "Advanced SEO Tools", highlighted: true },
                    "24/7 Priority Support",
                  ]}
                  onButtonClick={() => console.log("Get Started")}
                />

                {/* Image with Text */}
                <Card
                  variant="default"
                  coverImage={
                    <img
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                      alt="Workspace"
                      className="w-full h-40 object-cover"
                    />
                  }
                >
                  <h3 className="text-md font-semibold mb-1">
                    Workspace Setup
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Create the perfect environment for productivity and deep
                    work focus.
                  </p>
                </Card>

                {/* No Padding Card */}
                <Card variant="default" noPadding>
                  <div className="bg-[var(--color-accent-subtle)] h-full min-h-40 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-sm text-[var(--color-accent)] font-bold mb-1">
                      Full-bleed content
                    </h3>
                    <p className="text-xs text-[var(--color-accent)] opacity-80">
                      Use noPadding for custom edge-to-edge designs.
                    </p>
                  </div>
                </Card>
              </div>
            </Section>

            {/* ── Avatar ── */}
            <Section id="avatar" title="Avatar">
              <Row label="Sizes" align="center">
                <Avatar size="sm" initials="AB" />
                <Avatar size="md" initials="CD" />
                <Avatar size="lg" initials="EF" />
                <Avatar size="xl" initials="GH" />
              </Row>
              <Row label="Variants" align="center">
                <Avatar variant="initials" initials="JZ" size="md" />
                <Avatar variant="fallback" size="md" />
                <Avatar
                  variant="image"
                  src="https://i.pravatar.cc/150?img=3"
                  alt="Jane"
                  size="md"
                />
                <Avatar
                  variant="image"
                  src="broken-url"
                  initials="FB"
                  size="md"
                  title="Falls back to initials on error"
                />
              </Row>
            </Section>

            {/* ── Divider ── */}
            <Section id="divider" title="Divider">
              <Row label="Horizontal">
                <div className="w-full py-4">
                  <Divider />
                </div>
              </Row>
              <Row label="With label">
                <div className="w-full py-4">
                  <Divider label="or continue with" />
                </div>
              </Row>
              <Row label="Vertical (inside flex)">
                <div className="flex items-center justify-center gap-6 h-12 w-full py-2">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]"></span>
                  <Divider variant="vertical" />
                  <span className="text-sm font-medium text-[var(--color-text-muted)]"></span>
                </div>
              </Row>
            </Section>

            {/* ── Input ── */}
            <Section id="input" title="Input">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Input
                    label="Default"
                    placeholder="Enter text…"
                    helperText="Some helper text below."
                  />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Input label="With icons" placeholder="Search…" />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Input
                    label="Error state"
                    placeholder="bad@email"
                    errorMessage="Please enter a valid email address."
                  />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Input
                    label="Disabled"
                    placeholder="Can't touch this"
                    disabled
                  />
                </div>
              </div>
              <div className="mt-6">
                <Row label="Sizes">
                  <div className="w-48">
                    <Input placeholder="Small" inputSize="sm" />
                  </div>
                  <div className="w-48">
                    <Input placeholder="Medium" inputSize="md" />
                  </div>
                  <div className="w-48">
                    <Input placeholder="Large" inputSize="lg" />
                  </div>
                </Row>
              </div>
            </Section>

            {/* ── Textarea ── */}
            <Section id="textarea" title="Textarea">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Textarea
                    label="Default"
                    placeholder="Write something…"
                    helperText="Max 500 characters."
                  />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Textarea
                    label="Error state"
                    placeholder="Too short"
                    errorMessage="Message must be at least 20 characters."
                  />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Textarea
                    label="No resize"
                    placeholder="Fixed height…"
                    resize="none"
                    rows={3}
                  />
                </div>
                <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                  <Textarea
                    label="Disabled"
                    placeholder="Read-only area"
                    disabled
                    rows={3}
                  />
                </div>
              </div>
            </Section>

            {/* ── Tooltip ── */}
            <Section id="tooltip" title="Tooltip">
              <Row label="Placements">
                <Tooltip content="Appears on top" placement="top">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 hover:bg-[var(--color-accent-subtle)] transition-colors">
                    Top
                  </button>
                </Tooltip>
                <Tooltip content="Appears on bottom" placement="bottom">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 hover:bg-[var(--color-accent-subtle)] transition-colors">
                    Bottom
                  </button>
                </Tooltip>
                <Tooltip content="Appears on" placement="left">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 hover:bg-[var(--color-accent-subtle)] transition-colors"></button>
                </Tooltip>
                <Tooltip content="Appears on" placement="right">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 hover:bg-[var(--color-accent-subtle)] transition-colors"></button>
                </Tooltip>
              </Row>
            </Section>

            {/* ── Accordion ── */}
            <Section id="accordion" title="Accordion">
              <div className="p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                <Accordion
                  allowMultiple
                  defaultOpen={["what"]}
                  items={[
                    {
                      value: "what",
                      label: "What is this component library?",
                      content:
                        "A personal component library built with React 19, TypeScript, Tailwind CSS v4, and CVA. Components are split into primitive, Framer Motion animated, and GSAP animated categories.",
                    },
                    {
                      value: "tokens",
                      label: "How are design tokens applied?",
                      content:
                        'All colors, spacing, radii, shadows, and transitions are declared as CSS custom properties in index.css. Dark mode remaps these under .dark / [data-theme="dark"] — no JS logic needed in components.',
                    },
                    {
                      value: "disabled",
                      label: "This item is disabled",
                      content: "You should not see this.",
                      disabled: true,
                    },
                  ]}
                />
              </div>
            </Section>

            {/* ── Tabs ── */}
            <Section id="tabs" title="Tabs">
              <div className="p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                <Tabs
                  defaultValue="overview"
                  tabs={[
                    {
                      value: "overview",
                      label: "Overview",
                      content: (
                        <div className="pt-4">
                          <p className="text-sm text-[var(--color-text-muted)]">
                            The Overview tab shows high-level information about
                            the component.
                          </p>
                        </div>
                      ),
                    },
                    {
                      value: "props",
                      label: "Props",
                      content: (
                        <div className="pt-4">
                          <p className="text-sm text-[var(--color-text-muted)]">
                            The Props tab documents the component's TypeScript
                            interface and defaults.
                          </p>
                        </div>
                      ),
                    },
                    {
                      value: "examples",
                      label: "Examples",
                      content: (
                        <div className="pt-4">
                          <p className="text-sm text-[var(--color-text-muted)]">
                            The Examples tab contains usage examples and
                            copy-paste snippets.
                          </p>
                        </div>
                      ),
                    },
                    {
                      value: "disabled-tab",
                      label: "Disabled",
                      content: "",
                      disabled: true,
                    },
                  ]}
                />
              </div>
            </Section>

            {/* ── Modal ── */}
            <Section id="modal" title="Modal">
              <Row label="Trigger">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Button variant="ghost" onClick={() => setModalOpen(true)}>
                  Ghost trigger
                </Button>
              </Row>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Example modal"
                size="md"
                footer={
                  <>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                  </>
                }
              >
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  This modal uses the native{" "}
                  <code
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      background: "var(--color-surface)",
                    }}
                  >
                    &lt;dialog&gt;
                  </code>{" "}
                  element with{" "}
                  <code
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      background: "var(--color-surface)",
                    }}
                  >
                    showModal()
                  </code>
                  . It traps focus automatically, blocks page scroll, and closes
                  on backdrop click.
                </p>
              </Modal>
            </Section>

            {/* ── Dropdown ── */}
            <Section id="dropdown" title="Dropdown">
              <Row label="Placements">
                <Dropdown
                  placement="bottom"
                  trigger={<Button variant="ghost">Bottom (default)</Button>}
                  items={[
                    { label: "Edit", icon: <EditIcon />, onClick: () => {} },
                    { label: "Duplicate", onClick: () => {} },
                    { separator: true, label: "" },
                    { label: "Delete", icon: <TrashIcon />, onClick: () => {} },
                    {
                      label: "Disabled action",
                      onClick: () => {},
                      disabled: true,
                    },
                  ]}
                />
                <Dropdown
                  placement="top"
                  trigger={<Button variant="ghost">Top</Button>}
                  items={[
                    { label: "Option A", onClick: () => {} },
                    { label: "Option B", onClick: () => {} },
                  ]}
                />
              </Row>
            </Section>

            {/* ── Toast ── */}
            <Section id="toast" title="Toast">
              <Row label="Trigger variants">
                <Button
                  variant="secondary"
                  onClick={() =>
                    addToast("success", "Changes saved successfully.")
                  }
                >
                  Success toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => addToast("danger", "Something went wrong.")}
                >
                  Danger toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    addToast("warning", "Your session is about to expire.")
                  }
                >
                  Warning toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    addToast("info", "A new version is available.")
                  }
                >
                  Info toast
                </Button>
              </Row>
            </Section>

            {/* ── Navbar ── */}
            <Section id="navbar" title="Navbar">
              <Row label="Default (Logo, nav, actions)">
                <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <Navbar
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-xl">
                        Brand
                      </div>
                    }
                    links={[
                      { label: "Home", href: "#", isActive: true },
                      { label: "Products", href: "#" },
                      { label: "About", href: "#" },
                    ]}
                    actions={
                      <>
                        <Button variant="secondary" size="sm">
                          Log In
                        </Button>
                        <Button variant="primary" size="sm">
                          Sign Up
                        </Button>
                      </>
                    }
                  />
                  <div className="h-32 bg-[var(--color-bg-secondary)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
                    Page Content below Navbar
                  </div>
                </div>
              </Row>
              <Row label="Centered (Logo, center nav, actions)">
                <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <Navbar
                    variant="centered"
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-xl">
                        Store
                      </div>
                    }
                    links={[
                      { label: "Men", href: "#" },
                      { label: "Women", href: "#", isActive: true },
                      { label: "Kids", href: "#" },
                      { label: "Sale", href: "#" },
                    ]}
                    actions={
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        }
                      >
                        Cart (0)
                      </Button>
                    }
                  />
                  <div className="h-32 bg-[var(--color-bg-secondary)]" />
                </div>
              </Row>
              <Row label="Search (Logo, search center, profile)">
                <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <Navbar
                    variant="search"
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-xl">
                        DocSite
                      </div>
                    }
                    searchSlot={<Input placeholder="Search documentation..." />}
                    links={[
                      { label: "Docs", href: "#" },
                      { label: "API", href: "#" },
                    ]}
                    actions={<Avatar size="sm" initials="JD" />}
                  />
                  <div className="h-32 bg-[var(--color-bg-secondary)]" />
                </div>
              </Row>
            </Section>

            {/* ── Footer ── */}
            <Section id="footer" title="Footer">
              <Row label="Simple">
                <div className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] relative">
                  <Footer
                    variant="simple"
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-lg">
                        My App
                      </div>
                    }
                    copyright="© 2026 My App Inc. Alls reserved."
                    bottomLinks={[
                      { label: "Privacy Policy", href: "#" },
                      { label: "Terms of Service", href: "#" },
                      { label: "Status", href: "#" },
                    ]}
                  />
                </div>
              </Row>
              <Row label="Centered">
                <div className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] relative">
                  <Footer
                    variant="centered"
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-xl">
                        Minimal
                      </div>
                    }
                    description="Crafting elegant and fast digital experiences for modern teams across the globe."
                    copyright="© 2026 Minimal Corp."
                    bottomLinks={[
                      { label: "Home", href: "#" },
                      { label: "Pricing", href: "#" },
                      { label: "About", href: "#" },
                      { label: "Contact", href: "#" },
                    ]}
                    socialLinks={
                      <>
                        <a
                          href="#"
                          className="p-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="p-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors"
                        >
                          <span className="sr-only">GitHub</span>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </>
                    }
                  />
                </div>
              </Row>
              <Row label="Columns with Newsletter">
                <div className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] relative">
                  <Footer
                    variant="columns"
                    logo={
                      <div className="font-bold text-[var(--color-accent)] text-2xl">
                        Enterprise
                      </div>
                    }
                    description="A scalable solution designed for robust architectures and big teams aiming for global impact."
                    copyright="© 2026 Enterprise Inc."
                    columns={[
                      {
                        title: "Product",
                        links: [
                          { label: "Features", href: "#" },
                          { label: "Integrations", href: "#" },
                          { label: "Pricing", href: "#" },
                          { label: "Changelog", href: "#" },
                        ],
                      },
                      {
                        title: "Resources",
                        links: [
                          { label: "Documentation", href: "#" },
                          { label: "API Reference", href: "#" },
                          { label: "Community", href: "#" },
                          { label: "Blog", href: "#" },
                        ],
                      },
                      {
                        title: "Company",
                        links: [
                          { label: "About Us", href: "#" },
                          { label: "Careers", href: "#" },
                          { label: "Legal", href: "#" },
                          { label: "Contact", href: "#" },
                        ],
                      },
                    ]}
                    newsletterSlot={
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-[var(--color-text-primary)]">
                          Subscribe to our newsletter
                        </h3>
                        <p className="text-sm">
                          The latest news, articles, and resources, sent to your
                          inbox weekly.
                        </p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="flex-1"
                          />
                          <Button variant="primary">Subscribe</Button>
                        </div>
                      </div>
                    }
                  />
                </div>
              </Row>
            </Section>
          </div>
        </main>
      </div>

      {/* ── Toast stack ── */}
      <div className="fixed bottom-6-6 flex flex-col gap-3 z-[100]">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            message={t.message}
            onDismiss={() => dismissToast(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
