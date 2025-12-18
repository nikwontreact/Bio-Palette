import { Mail, MapPin, Clock, Send } from "lucide-react";
import { SiLinkedin, SiGithub, SiResearchgate, SiOrcid } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  { name: "LinkedIn", icon: SiLinkedin, href: "#", color: "hover:text-[#0A66C2]" },
  { name: "GitHub", icon: SiGithub, href: "#", color: "hover:text-[#333] dark:hover:text-white" },
  { name: "ResearchGate", icon: SiResearchgate, href: "#", color: "hover:text-[#00CCBB]" },
  { name: "ORCID", icon: SiOrcid, href: "#", color: "hover:text-[#A6CE39]" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "alex.chen@stanford.edu" },
  { icon: MapPin, label: "Location", value: "Stanford, California" },
  { icon: Clock, label: "Response Time", value: "Usually within 24 hours" },
];

export function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-24"
      data-testid="section-contact"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            data-testid="text-contact-title"
          >
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in collaboration or have questions about my research?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card data-testid="card-contact-form">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register("name", { required: "Name is required" })}
                      data-testid="input-name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    {...register("subject", { required: "Subject is required" })}
                    data-testid="input-subject"
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    data-testid="input-message"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card data-testid="card-contact-info">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-3"
                      data-testid={`info-${info.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="p-2 rounded-md bg-primary/10 flex-shrink-0">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-social-links">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Connect with Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="lg"
                      className={`flex-1 min-w-[120px] ${social.color}`}
                      asChild
                      data-testid={`link-social-${social.name.toLowerCase()}`}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5 mr-2" />
                        {social.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20" data-testid="card-availability">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 h-3 w-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <div>
                    <p className="font-medium">Currently Available</p>
                    <p className="text-sm text-muted-foreground">
                      Open to research collaborations and opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
