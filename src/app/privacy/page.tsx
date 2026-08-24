import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/ArticleLayout";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.companyName} collects, uses, and shares information on ${site.name}. TCPA consent, SMS non-sharing, California rights, cookies, and related terms.`,
  path: "/privacy",
});

function PrivacyContact() {
  return (
    <address className="not-italic">
      <p>{site.companyName}</p>
      <p>
        Call or text:{" "}
        <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
      </p>
      <p>
        Or use{" "}
        <Link href="/contact">/contact</Link> on the Site.
      </p>
    </address>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: August 24, 2026. This policy describes how ${site.companyName} collects, uses, and shares information on ${site.name}.`}
      />
      <Container as="article" className="max-w-3xl py-12">
        <Prose>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {site.name}
          </p>
          <p>
            We understand the importance of protecting your online privacy,
            specifically when conducting business. As such, {site.companyName}{" "}
            (the &quot;Company&quot;) is committed to respecting your privacy.
            Our Privacy Policy pertains to users of our Site (&quot;Visitors,&quot;
            &quot;you&quot; or &quot;your&quot;) who visit without submitting an
            inquiry and Visitors who submit inquiries, use the calculator, book a
            call, or otherwise use the Site (&quot;Authorized Customers&quot;)
            and make use of the various services offered by the Company
            (collectively, &quot;Services&quot;).
          </p>
          <p>
            By accessing or using the Site (as defined hereinafter), you are
            entering into a binding legal agreement with the Company; the
            website, located at {site.name} ({site.url}) (the &quot;Site&quot;);
            and the third-party service vendors who use the Site and their parent
            companies, subsidiaries, and affiliates (the &quot;Company,&quot;
            &quot;us,&quot; &quot;we,&quot; and &quot;our&quot;) relating to
            terms and conditions of privacy (&quot;Privacy Policy&quot;). This
            Privacy Policy is in effect for any web page; mobile application;
            e-mail list; and information, including Personally Identifiable
            Information, collected/owned by us, regardless of the method of
            collection, including collection through any online features,
            services, and/or programs we offer. This Privacy Policy is not
            applicable to your use of any third-party web page, mobile
            application, social media site, or any information collected or
            owned by any entity other than us.
          </p>
          <p>
            This Privacy Policy is incorporated by reference in our{" "}
            <Link href="/terms">Terms of Service</Link>, and by using the Site
            or the Services and/or submitting your information through an
            inquiry, the calculator, a booking request, or a contact form, you
            give express consent to all of the terms contained herein, as well
            as those provided in our Terms of Service, and such use and actions
            constitute your electronic signature. You may withdraw this consent
            by using the opt-out procedures described below.
          </p>

          <h2>Communications</h2>
          <p>
            <strong>EXPRESS WRITTEN CONSENT.</strong> BY SUBMITTING YOUR CONTACT
            INFORMATION, YOU ARE PROVIDING YOUR EXPRESS WRITTEN CONSENT TO
            RECEIVE COMMUNICATIONS FROM US AT THE E-MAIL ADDRESS AND TELEPHONE
            NUMBERS YOU ENTERED INTO OUR CONTACT FORM, OR THAT YOU LATER PROVIDE
            TO US OR ENTER INTO YOUR CONTACT PAGE. SUCH COMMUNICATIONS MAY
            INCLUDE ATTEMPTS TO CONTACT YOU VIA AUTO-DIALING TECHNOLOGIES,
            AUTO-TEXTING TECHNOLOGIES, ARTIFICIAL TEXTING CHATBOTS, AND/OR
            PRERECORDED, ARTIFICIAL, OR AI-GENERATED VOICE CALLS. YOUR CONSENT
            ALSO SERVES AS YOUR EXPRESS WRITTEN CONSENT TO YOUR PAST RECEIPT OF
            ELECTRONIC COMMUNICATIONS FROM US. YOU FURTHER REPRESENT AND WARRANT
            THAT: (I) YOU ARE AT LEAST 18 YEARS OLD; (II) YOU LIVE IN THE UNITED
            STATES (OR CANADA, IN SUCH CASE, THE CANADIAN CONSENTS BELOW SHALL
            APPLY); (III) YOU HAVE NOT REGISTERED ON A NATIONAL OR STATEWIDE
            DO-NOT-CALL LIST, OR OTHERWISE GRANT THE COMPANY A WAIVER TO SUCH
            REGISTRATION FOR THE USE HEREOF; (IV) YOU ARE THE ACCOUNT HOLDER OF,
            OR HAVE THE REQUIRED CONSENT TO PROVIDE THE PHONE NUMBERS AND E-MAIL
            ADDRESSES PROVIDED; (V) THE PHONE NUMBERS AND E-MAIL ADDRESSES
            PROVIDED ARE ACCURATE, AND YOU WILL PROVIDE US NOTICE IF YOU RELEASE
            EITHER SUCH ACCOUNT TO ANOTHER.
          </p>
          <p>
            <strong>COMMUNICATIONS INCLUDE.</strong> THESE COMMUNICATIONS MAY
            INCLUDE, WITHOUT LIMITATION, TELEMARKETING MESSAGES, THROUGH THE USE
            OF E-MAIL, LANDLINE PHONE, FAX, CELLULAR PHONE, TEXT MESSAGES
            (INCLUDING SMS AND MMS), AND NOTIFICATIONS THROUGH ANY APP THAT WE
            PRODUCE.
          </p>
          <p>
            <strong>AUTODIALING.</strong> WE MAY USE AN AUTOMATIC TELEPHONE
            DIALING SYSTEM (OR &quot;AUTO-DIALER&quot;), WHICH MAY EMPLOY AN
            ARTIFICIAL OR PRE-RECORDED VOICE OR &quot;ROBOTEXTS.&quot; YOUR
            CARRIER&apos;S STANDARD RATES AND CHARGES MAY APPLY.
          </p>
          <p>
            <strong>NO PURCHASE NECESSARY.</strong> AGREEING TO THESE
            COMMUNICATIONS IS NOT A CONDITION OF PURCHASING ANY PROPERTY, GOODS,
            OR SERVICES FROM US.
          </p>
          <p>
            <strong>REVOKING CONSENT AND OPTING OUT.</strong> YOU MAY REVOKE YOUR
            CONSENT TO RECEIVE CERTAIN COMMUNICATIONS AT ANY TIME. TO STOP
            RECEIVING TEXT MESSAGES, REPLY &quot;STOP&quot; TO ANY OF OUR TEXTS.
            TO STOP RECEIVING E-MAILS, CLICK THE &quot;UNSUBSCRIBE&quot; LINK
            WHEN PROVIDED, OR REPLY &quot;UNSUBSCRIBE&quot; TO THE E-MAIL WHEN AN
            AUTOMATED UNSUBSCRIBE LINK IS NOT AVAILABLE. TO STOP RECEIVING PHONE
            CALLS, COMMUNICATE THAT REQUEST TO US VIA PHONE, TEXT MESSAGE, OR
            E-MAIL. WE WILL MAKE A COMMERCIALLY REASONABLE EFFORT TO COMPLY WITH
            ANY COMMUNICATIONS FROM YOU OPTING OUT. BY CONTACTING US TO OPT-OUT
            OF A CERTAIN COMMUNICATION, YOU CONSENT TO RECEIVE A FINAL
            COMMUNICATION CONFIRMING YOUR OPT-OUT.
          </p>
          <p>
            <strong>COMMUNICATION FREQUENCY.</strong> HOW OFTEN WE SEND YOU
            COMMUNICATIONS WILL VARY, BECAUSE THE INDIVIDUAL SALESPERSON WHO
            COMMUNICATE WITH YOU WILL DETERMINE SUCH FREQUENCY.
          </p>
          <p>
            <strong>COMMUNICATIONS PROVISIONS – CANADIAN RESIDENTS.</strong> IN
            ADDITION TO THE CONSENT PROVIDED ABOVE, CANADIAN RESIDENTS AGREE TO
            THE FOLLOWING COMPLIANCE PROVISIONS, WITH RESPECT TO CANADA&apos;S
            ANTI-SPAM LEGISLATION, CANADA&apos;S PERSONAL INFORMATION PROTECTION
            AND ELECTRONIC DOCUMENTS ACT, AND CANADIAN PROVINCIAL LAW, INCLUDING
            ALBERTA&apos;S PERSONAL INFORMATION PROTECTION ACT, AND QUEBEC&apos;S
            ACT RESPECTING THE PROTECTION OF PERSONAL INFORMATION IN THE PRIVATE
            SECTOR: (i) YOU AGREE TO THE PROVISIONS GOVERNING USE AND DISCLOSURE
            OF PERSONAL INFORMATION THAT ARE FOUND IN THIS PRIVACY POLICY; (ii)
            OUR COMMUNICATION WITH YOU SHALL CONTINUE UNTIL YOU OPT-OUT, WHICH
            INDICATES YOU ARE NO LONGER CONSIDERING DSCR INVESTOR-LOAN
            OPPORTUNITIES OR THE SERVICES WE PROVIDE; AND (iii) YOUR PERSONAL
            INFORMATION MAY ALSO BE TRANSMITTED TO, USED IN, AND STORED IN THE
            U.S.
          </p>

          <h2>Personally Identifiable Information</h2>
          <p>
            Personally Identifiable Information refers to any information that
            identifies or can be used to identify, contact, or locate the person
            to whom such information pertains, including, but not limited to,
            name, address, phone number, fax number, e-mail address, financial
            profile, social security number, and credit card information.
            Personally Identifiable Information does not include information
            that is collected anonymously (that is, without identification of
            the individual user) or demographic information not connected to an
            identified individual.
          </p>

          <h3>What Personally Identifiable Information is collected?</h3>
          <p>
            We may collect basic user profile information from all of our
            Visitors. We collect the following additional information from our
            Authorized Customers: name, address, phone number, internet protocol
            address (IP address), and e-mail address.
          </p>

          <h3>What organizations are collecting the information?</h3>
          <p>
            In addition to our direct collection of information, our third-party
            service vendors (such as HighLevel, which provides CRM, SMS, email,
            form, and scheduling tools on the Site; capital sources; insurance
            brokers; and title companies), which may provide such services as
            customer relationship management, SMS and email communications,
            appointment scheduling, mortgage lending by third-party capital
            sources, mortgage insurance, escrow services, and title insurance,
            may collect this information from our Visitors and Authorized
            Customers. We do not control how these third parties use such
            information, but we do ask them to disclose how they use personal
            information provided to them by Visitors and Authorized Customers.
            Some of these third parties may be intermediaries that act solely as
            links in the distribution chain, and do not store, retain, or use
            the information provided to them. We are a broker, not a lender; we
            do not fund loans.
          </p>

          <h3>How does the Site use Personally Identifiable Information?</h3>
          <p>
            We use Personally Identifiable Information to customize the Site, to
            make appropriate service offerings, and to fulfill inquiries,
            calculator requests, and call-booking requests made on the Site. We
            may e-mail Visitors and Authorized Customers about research, DSCR or
            business-purpose investor-loan information, or opportunities to
            inquire, use the calculator, or book a call on the Site, or
            information related to the subject matter of the Site. We may also
            use Personally Identifiable Information to contact Visitors and
            Authorized Customers in response to specific inquiries, or to
            provide requested information.
          </p>

          <h3>With whom may the information be shared?</h3>
          <p>
            Data will not be shared with third parties for marketing or
            promotional purposes.
          </p>
          <p>
            Personally Identifiable Information pertaining to Authorized
            Customers and other non-personally identifiable information will be
            shared with our employees and with third-party service providers who
            assist us with our Site operations or other services we may offer,
            including HighLevel for CRM, SMS, email, forms, and scheduling.
            Personally Identifiable Information about Authorized Customers may
            be shared with other Authorized Customers and other providers of
            real estate-related or investor-loan services, such as capital
            sources we work with, which wish to evaluate potential transactions
            with other Authorized Customers and/or us. Further, we may share
            aggregated information about our Visitors and Authorized Customers,
            including demographics, with our affiliated agencies and third-party
            vendors. We also offer the opportunity to &quot;opt out&quot; of
            receiving information or being contacted by us or by any agency
            acting on our behalf. Our employees, agents, third-party service
            providers and partners are contractually bound to use Personally
            Identifiable Information solely in connection with providing the
            Services, and may not use it for any other purpose.
          </p>
          <p>
            We may disclose information provided by Visitors as part of any
            merger, sale, acquisition, or financing of our company. Furthermore,
            in some instances, we may be legally required to provide information
            about Visitors to government authorities, including law enforcement,
            Homeland Security, and intelligence agencies. We cooperate with law
            enforcement in identifying persons using our Services for illegal
            activities and reserve the right to report any activities that we
            believe to be unlawful or in violation of our Terms and Conditions.
          </p>

          <h3>SMS non-sharing clause</h3>
          <p>
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes.
          </p>
          <p>
            Text messaging originator opt-in data, consent, and related personal
            information will not be shared with any third parties unless
            required by law or necessary to deliver SMS services.
          </p>

          <h3>How is Personally Identifiable Information stored?</h3>
          <p>
            Personally Identifiable Information collected by the Company is
            securely stored in accordance with current industry standards and is
            not accessible to third parties or employees of the Company except
            for use as indicated above.
          </p>

          <h3>
            What choices are available to Visitors regarding collection, use and
            distribution of the information?
          </h3>
          <p>
            Visitors and Authorized Customers may opt out of receiving
            unsolicited information from us or being contacted by us and/or our
            vendors and affiliated agencies, as well as request of us and
            receive from us information on the specific elements of their
            Personally Identifiable Information being held by us, by responding
            to e-mails as instructed, or by contacting us at:
          </p>
          <PrivacyContact />

          <h2>Are Cookies used on the Site?</h2>
          <p>
            Cookies are used on the Site for a variety of reasons. We use
            Cookies to obtain information about the preferences of our Visitors
            and the services they select. We also use Cookies for security
            purposes to protect our Authorized Customers. For example, if an
            Authorized Customer submits an inquiry or books a call after using
            the Site, Cookies allow us to securely associate the Authorized
            Customer&apos;s calculator or inquiry preferences with that request.
          </p>

          <h2>How does the Company use log-in information?</h2>
          <p>
            The Company uses log-in information, including, but not limited to,
            IP addresses, ISPs, and browser types, to analyze trends, administer
            the Site, track a user&apos;s movement and use, and gather broad
            demographic information.
          </p>

          <h2>
            What partners or service providers have access to Personally
            Identifiable Information from Visitors and/or Authorized Customers
            on the Site?
          </h2>
          <p>
            The Company has entered into and will continue to enter into
            partnerships and other affiliations with a number of vendors. Such
            vendors may have access to certain Personally Identifiable
            Information on a need-to-know basis for evaluating Authorized
            Customers for service eligibility. Our Privacy Policy does not cover
            their collection or use of this information or disclosure of
            Personally Identifiable Information to comply with law. We will
            disclose Personally Identifiable Information in order to comply with
            a court order or subpoena or a request from a law enforcement agency
            to release information. We will also disclose Personally
            Identifiable Information when reasonably necessary to protect the
            safety of our Visitors and Authorized Customers.
          </p>

          <h2>How does the Site keep Personally Identifiable Information secure?</h2>
          <p>
            All of our employees are fully informed of our security policy and
            practices. The Personally Identifiable Information of our Visitors
            and Authorized Customers is only accessible to a limited number of
            qualified employees with a password for accessing the information.
            We audit our security systems and processes on a regular basis. We
            utilize encryption protocols to protect sensitive information sent
            over the Internet. While we take commercially reasonable measures to
            maintain a secure site, electronic communications and databases are
            subject to errors, tampering, and break-ins, and we cannot guarantee
            or warrant that such events will not take place and will not be
            liable to Visitors or Authorized Customers for any such occurrences.
          </p>

          <h2>
            How can Visitors correct any inaccuracies in Personally Identifiable
            Information?
          </h2>
          <p>
            Visitors and Authorized Customers may contact us to update
            Personally Identifiable Information related to them or to correct
            any inaccuracies by calling or texting us at {site.phoneDisplay}, or
            by using the <Link href="/contact">/contact</Link> form on the Site.
            We encourage Visitors and Authorized Customers to keep Personally
            Identifiable Information up to date at all times. With that said,
            changes and updates to Personally Identifiable Information will only
            be reflected going forward, and we cannot alter any information we
            may have provided to a third party.
          </p>

          <h2>
            Can a Visitor delete or deactivate Personally Identifiable
            Information collected by the Site?
          </h2>
          <p>
            We provide Visitors and Authorized Customers with a mechanism to
            request data deletion of Personally Identifiable Information from
            the Site&apos;s database by contacting us via the information
            provided in this Privacy Policy, as well as to direct any of the
            third-party service providers which assist us with our Site
            operations or other services we may offer to delete/deactivate
            Personally Identifiable Information held by them which was originally
            received by them from us. However, because of backups and records of
            deletions, it may be impossible to delete a Visitor&apos;s entry
            without retaining some residual information. An individual who
            requests to have Personally Identifiable Information deactivated
            will have this information functionally deleted, and we will not
            sell, transfer, or share Personally Identifiable Information
            relating to that individual outside of our business line.
          </p>

          <h2>
            Do our Visitors and Authorized Customers have rights to
            non-discrimination for enacting their rights to protect their
            Personally Identifiable Information?
          </h2>
          <p>
            We do not and cannot, under the law, discriminate against Visitors
            and Authorized Customers for exercising any of their rights with
            regard to their Personally Identifiable Information, as detailed
            herein. Such forbidden discrimination includes, denying goods or
            services, charging different prices, or providing a different level
            or quality of service. However, we are, under the law, able to offer
            different services and rates if such differences are reasonably
            related to the value of the consumers&apos; data.
          </p>

          <h2>California users&apos; rights</h2>
          <p>
            We provide the following disclosures pursuant to Cal. Bus. &amp;
            Prof. Code § 22575 - 22579.
          </p>
          <p>
            We provide Visitors and Authorized Customers, including those
            claiming California residency, with information on how to exercise
            their respective disclosure options and choices pertaining to
            Personally Identifiable Information, such as the right to opt-out or
            unsubscribe, or opt-in for use of Personally Identifiable
            Information by third parties for marketing purposes. Accordingly,
            pursuant to the California Civil Code, we are not required to
            maintain or disclose a list of the third parties that have received
            Personally Identifiable Information for marketing purposes during
            the preceding year.
          </p>
          <p>
            California residents wishing to request information about how to
            exercise their disclosure options and choices pertaining to third
            party disclosures, please send requests titled &quot;Request for
            California Disclosure Choices&quot; through the{" "}
            <Link href="/contact">/contact</Link> form on the Site, or by
            calling or texting {site.phoneDisplay}. With all requests, please
            include your name, street address, city, state, zip code and e-mail
            address. We do not currently accept requests by mail or fax. We are
            not responsible for failure to respond to incomplete or incorrectly
            labeled or submitted notices.
          </p>
          <p>
            We do not abide by Do Not Track signals from a user&apos;s Internet
            browser. We make no representations concerning third parties that do
            not collect Personally Identifiable Information directly through our
            Site.
          </p>

          <h2>Minors</h2>
          <p>
            Our Site is not intended for use by minors, and as such, no one
            under the age of 18 should use, or provide any personal information
            to, our Site. If we discover that we have mistakenly collected
            personal information from a child under the age of 13, we will
            delete that information as soon as possible.
          </p>

          <h2>Links</h2>
          <p>
            The Site contains links to other web sites. Please note that when
            you click on one of these links, you are moving to another web site.
            We encourage you to read the privacy statements of these linked
            sites, as their privacy policies may differ from ours.
          </p>

          <h2>Governing Law and Jurisdiction</h2>
          <p>
            By accessing or using the Service, you agree to be bound by this
            Privacy Policy, which shall be governed by, and construed in
            accordance with, the laws of the state of California, exclusive of
            its choice of law rules. For any Disputes deemed not subject to
            binding, individual arbitration, as provided in the section
            immediately below, you and the Company agree to submit to the
            exclusive jurisdiction of the state of California, or, if federal
            court jurisdiction exists, the United States District Court for the
            state of California. You and the Company agree to waive any
            jurisdictional, venue, or inconvenient forum objections to such
            courts (without affecting either party&apos;s rights to remove a
            case to federal court if permissible), as well as any right to a
            jury trial. The Convention on Contracts for the International Sale
            of Goods will not apply. Any law or regulation which provides that
            the language of a contract shall be construed against the drafter
            will not apply to this Agreement. This Section will be interpreted
            as broadly as applicable law permits.
          </p>

          <h2>What happens if the Privacy Policy Changes?</h2>
          <p>
            We reserve the right to modify or amend this Privacy Policy at any
            time by posting the revised Privacy Policy. We will let our Visitors
            and Authorized Customers know about changes to our Privacy Policy by
            posting such changes on the Site.
          </p>
          <p>Last updated on August 24, 2026.</p>
        </Prose>
      </Container>
    </>
  );
}
