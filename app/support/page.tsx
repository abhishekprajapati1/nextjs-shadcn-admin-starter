import {
  Headphones,
  Mail,
  MapPin,
  Clock,
  Phone,
  LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/support/ContactForm";
import Footer from "@/components/navigation/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Contact | Akku Ka Chasma",
  description:
    "Get in touch with Akku Ka Chasma's customer support team. We're here to help with your eyewear needs, queries, and concerns. Available via phone, email, or visit our store in New Delhi.",
  keywords: [
    "customer support",
    "contact us",
    "akku ka chasma support",
    "eyewear help",
    "optical store contact",
    "eyewear customer service",
    "delhi optical store",
    "eyewear consultation",
  ],
  openGraph: {
    title: "Support & Contact | Akku Ka Chasma",
    description:
      "Get in touch with Akku Ka Chasma's customer support team. We're here to help with your eyewear needs, queries, and concerns. Available via phone, email, or visit our store in New Delhi.",
    url: "https://akkukachasma.com/support",
    siteName: "Akku Ka Chasma",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://akkukachasma.com/support",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            How Can We Help?
          </h1>
          <p className="text-lg text-muted-foreground">
            Our dedicated support team is here to assist you with any questions
            or concerns you may have.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ContactCard
            icon={Phone}
            title="Phone Support"
            details="+91 1234567890"
            subDetails="Mon-Sat 9am to 6pm"
          />
          <ContactCard
            icon={Mail}
            title="Email"
            details="support@akkuchasma.com"
            subDetails="24/7 Support"
          />
          <ContactCard
            icon={MapPin}
            title="Visit Us"
            details="123, Business Hub"
            subDetails="New Delhi, India"
          />
          <ContactCard
            icon={Clock}
            title="Business Hours"
            details="Monday - Saturday"
            subDetails="9:00 AM - 6:00 PM"
          />
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have a question about our products or services? Fill out the form
              and we'll get back to you shortly.
            </p>

            <div className="space-y-6">
              <h3 className="font-semibold">What to expect:</h3>
              <ul className="space-y-4">
                <ExpectationItem
                  title="Quick Response"
                  description="We aim to respond within 24 hours"
                />
                <ExpectationItem
                  title="Expert Support"
                  description="Get help from our experienced team"
                />
                <ExpectationItem
                  title="Detailed Solutions"
                  description="Comprehensive answers to your queries"
                />
              </ul>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  details: string;
  subDetails: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  details,
  subDetails,
}) => {
  return (
    <div className="group p-6 rounded-lg border bg-card hover:bg-accent transition-colors">
      <Icon className="h-6 w-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground mb-1">{details}</p>
      <p className="text-sm text-muted-foreground">{subDetails}</p>
    </div>
  );
};

interface ExpectationItemProps {
  title: string;
  description: string;
}

const ExpectationItem: React.FC<ExpectationItemProps> = ({
  title,
  description,
}) => {
  return (
    <li className="flex items-start space-x-3">
      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Headphones className="h-3 w-3 text-primary" />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </li>
  );
};
