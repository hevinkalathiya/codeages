import { useState } from "react";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  // Initialize state for form fields and loading state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        "service_d9tw7gu",
        "template_1o5sm1i",
        {
          from_name: `${formState.name}`,
          to_name: "Hevin",
          from_email: formState.email,
          to_email: "hevinvnsgu@gmail.com",
          message: `Subject ${formState.subject}\n\n\nMessage${formState.message}`,
        },
        "MD0HgTvWwyaf-K_yS"
      )
      .then(
        () => {
          setIsLoading(false);
          toast.success(
            "Thank you. We will get back to you as soon as possible.",
            { duration: 4000 }
          );
          setFormState({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setIsLoading(false);
          console.error(error);
          toast.error("Ahh, something went wrong. Please try again.", {
            duration: 4000,
          });
        }
      );
  };

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
              onSubmit={handleSubmit}
            >
              <h2 className="h4 mb-6">Send A Message</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="form-textarea max-h-32 w-full"
                  rows="6"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                className="btn btn-primary block w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Contact;
