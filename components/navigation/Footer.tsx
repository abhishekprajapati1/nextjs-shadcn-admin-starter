import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <div>© 2024 Akku Ka Chasma. All rights reserved.</div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
