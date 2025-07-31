import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

function PrivacyPolicyPage() {
  // The Privacy Policy content in Markdown format
  const privacyPolicyMarkdown = `
# Privacy Policy for Om Agro Center

**Effective Date: July 29, 2025**

Welcome to Om Agro Center! We are committed to protecting your privacy and ensuring you have a safe and secure experience on our website. This Privacy Policy explains how Om Agro Center ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you visit our website (omagrocenter.com) and use our services.

By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our website.

## 1. Information We Collect

We collect various types of information to provide and improve our services to you:

* **Personal Information:** This is information that can identify you directly or indirectly. We may collect:
    * **Contact Details:** Name, email address, phone number, shipping address, billing address.
    * **Payment Information:** Details required for processing payments (e.g., credit/debit card numbers). Please note that we do not store full payment card details on our servers; these are securely processed by our third-party payment gateway partners.
    * **Account Information:** Username, password (encrypted), and purchase history.
    * **Correspondence:** Records of communications when you contact us for support or inquiries.

* **Usage Data:** This is information about how you access and use our website. This may include:
    * Your computer's Internet Protocol (IP) address.
    * Browser type and version.
    * Pages of our website that you visit.
    * The time and date of your visit.
    * The time spent on those pages.
    * Unique device identifiers and other diagnostic data.

* **Cookies and Tracking Technologies:** We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.

## 2. How We Use Your Information

We use the collected information for various purposes:

* **To Provide and Maintain Our Service:** Including processing your orders, delivering products, and managing your account.
* **To Improve and Personalize Your Experience:** To understand how you use our services and to offer you products and content that are most relevant to your interests.
* **For Customer Support:** To respond to your inquiries, resolve issues, and provide assistance.
* **For Marketing and Promotions:** To send you newsletters, special offers, and information about new products or services that may be of interest to you. You can opt-out of receiving these communications at any time.
* **For Analytics and Research:** To monitor the usage of our website, detect, prevent, and address technical issues.
* **To Comply with Legal Obligations:** Including tax, audit, and other regulatory requirements.

## 3. How We Share Your Information

We may share your information in the following situations:

* **With Service Providers:** We may share your data with third-party companies and individuals who perform services on our behalf, such as payment processing, shipping and delivery, website hosting, data analysis, email delivery, and customer service. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
* **For Business Transfers:** If Om Agro Center is involved in a merger, acquisition, or asset sale, your Personal Information may be transferred. We will provide notice before your Personal Information is transferred and becomes subject to a different Privacy Policy.
* **For Legal Reasons:** We may disclose your Personal Information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
* **With Your Consent:** We may disclose your personal information for any other purpose with your express consent.

## 4. Data Security

The security of your data is important to us. We implement reasonable technical and organizational measures designed to protect your Personal Information from unauthorized access, use, alteration, and disclosure. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.

## 5. Your Data Protection Rights

Depending on your location and applicable laws, you may have the following rights regarding your Personal Information:

* **The Right to Access:** You have the right to request copies of your personal data.
* **The Right to Rectification:** You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
* **The Right to Erasure:** You have the right to request that we erase your personal data, under certain conditions.
* **The Right to Restrict Processing:** You have the right to request that we restrict the processing of your personal data, under certain conditions.
* **The Right to Object to Processing:** You have the right to object to our processing of your personal data, under certain conditions.
* **The Right to Data Portability:** You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.

## 6. Links to Other Websites

Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

## 7. Children's Privacy

Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.

## 8. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

## 9. Contact Us

If you have any questions about this Privacy Policy, you can contact us:

* **By email:** quickhirehub143@gmail.com
* **By visiting this page on our website:** https://om-frontend.vercel.app/contact
* **By phone number:** +91 9889079086
* **By mail:** Bargadawa Sumergarh Maharajganj, Uttar Pradesh, India 273306
  `;

  // For styling the markdown output with Tailwind CSS
  const markdownStyles = `
    prose prose-lg max-w-none
    prose-h1:text-green-800 prose-h1:font-extrabold prose-h1:mb-6
    prose-h2:text-green-700 prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
    prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
    prose-li:text-gray-700 prose-strong:font-semibold
    prose-a:text-blue-600 hover:prose-a:underline
    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
    prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
    lg:prose-xl
  `;

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Apply markdownStyles to a wrapping div, not directly to ReactMarkdown */}
      <div className={markdownStyles}>
        <ReactMarkdown>
          {privacyPolicyMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
