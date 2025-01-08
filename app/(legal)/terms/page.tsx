import LegalSection from "@/components/legal/LegalSection";
import AuthHeader from "@/components/navigation/AuthHeader";
import Footer from "@/components/navigation/Footer";
import { AlertTriangle, ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <AuthHeader>
        <></>
      </AuthHeader>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <ScrollText className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using our services
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <div className="space-y-8">
            <LegalSection
              title="1. Acceptance of Terms"
              content="By accessing and using Akku Ka Chasma's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services."
            />

            <LegalSection
              title="2. Business Account Registration"
              content="To use our wholesale services, you must register a business account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete."
            />

            <LegalSection
              title="3. Ordering and Payment"
              bullets={[
                "Minimum order quantities may apply",
                "Prices are subject to change without notice",
                "Payment terms are strictly adhered to",
                "All payments must be made in Indian Rupees",
              ]}
            />

            <LegalSection
              title="4. Shipping and Delivery"
              bullets={[
                "Free shipping on orders above ₹999",
                "Delivery timelines are estimates only",
                "Risk of loss transfers upon delivery",
                "Shipping only within India",
              ]}
            />

            <LegalSection
              title="5. Returns and Refunds"
              content="We offer a 14-day return policy for most items. Returns must be in original condition with all tags and packaging intact."
            />

            <LegalSection
              title="6. Privacy and Data Protection"
              content="Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your data."
            />

            {/* Important Notes */}
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-destructive">
                    Important Notice
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Violation of these terms may result in account suspension or
                    termination. We reserve the right to modify these terms at
                    any time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
            Last updated: February 15, 2024
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
