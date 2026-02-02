import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import React from 'react';

interface ContactEmailProps {
    name: string;
    email: string;
    company?: string;
    message: string;
}

export default function ContactEmail({
    name,
    email,
    company,
    message,
}: ContactEmailProps) {
    const previewText = `New message from ${name}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                New Contact Form Submission
                            </Heading>
                            <Text className="text-black text-[14px] leading-[24px]">
                                Hello BevaBid Team,
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px]">
                                You have received a new message from your website contact form.
                            </Text>
                        </Section>

                        <Section className="bg-gray-50 p-6 rounded-lg mb-6">
                            <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">
                                From
                            </Text>
                            <Text className="text-gray-900 text-base font-medium mb-4">
                                {name} <span className="text-gray-500 font-normal">({email})</span>
                            </Text>

                            {company && (
                                <>
                                    <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">
                                        Company
                                    </Text>
                                    <Text className="text-gray-900 text-base font-medium mb-4">
                                        {company}
                                    </Text>
                                </>
                            )}

                            <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">
                                Message
                            </Text>
                            <Text className="text-gray-900 text-base whitespace-pre-wrap">
                                {message}
                            </Text>
                        </Section>

                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            This email was sent from the contact form on bevabid.com.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
