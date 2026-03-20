/**
 * src/services/api.ts
 * This module provides the data access layer for the application,
 * abstracting interactions with external content and subscription APIs.
 * Since the application has no internal database, this layer handles all
 * data fetching and submission to external services.
 *
 * For demonstration purposes, mock data and simulated API calls are used.
 * In a real application, replace `MOCK_NEWSLETTERS`, `MOCK_NEWSLETTER_DETAIL`
 * and the `setTimeout` calls with actual `fetch` requests to your external API endpoints.
 */

import {
  NewsletterListItem,
  NewsletterContent,
  SubscriptionPayload,
  ApiResponse,
} from '../types';

// --- Configuration for External APIs ---
// Replace these with your actual external API endpoints
const EXTERNAL_CONTENT_API_BASE_URL = 'https://api.example.com/newsletters'; // Example
const EXTERNAL_SUBSCRIPTION_API_URL = 'https://api.example.com/subscribe'; // Example

// --- Mock Data (for development/demonstration without a live external API) ---
const MOCK_NEWSLETTERS: NewsletterListItem[] = [
  {
    id: 'newsletter-1',
    title: 'The Future of AI: A Deep Dive',
    publishDate: '2023-10-26',
    description: 'Exploring the latest advancements and ethical considerations in artificial intelligence.',
    imageUrl: 'https://via.placeholder.com/150/007bff/ffffff?text=AI+Future',
  },
  {
    id: 'newsletter-2',
    title: 'Web Development Trends 2024',
    publishDate: '2023-10-19',
    description: 'A comprehensive look at the upcoming technologies and methodologies shaping web development.',
    imageUrl: 'https://via.placeholder.com/150/28a745/ffffff?text=Web+Trends',
  },
  {
    id: 'newsletter-3',
    title: 'Healthy Living: Mind, Body, and Soul',
    publishDate: '2023-10-12',
    description: 'Tips and tricks for maintaining a balanced and healthy lifestyle in the modern world.',
    imageUrl: 'https://via.placeholder.com/150/ffc107/343a40?text=Healthy+Living',
  },
];

const MOCK_NEWSLETTER_DETAIL: { [key: string]: NewsletterContent } = {
  'newsletter-1': {
    id: 'newsletter-1',
    title: 'The Future of AI: A Deep Dive',
    publishDate: '2023-10-26',
    author: 'Dr. Ava Turing',
    contentHtml: `
      <h2>The Rise of Generative AI</h2>
      <p>Generative AI models like GPT-4 and DALL-E have revolutionized content creation, enabling machines to produce human-like text, images, and even code. This section explores the underlying principles and recent breakthroughs.</p>
      <h3>Ethical Considerations</h3>
      <p>As AI becomes more powerful, ethical concerns around bias, privacy, and job displacement grow. We delve into the ongoing debates and proposed solutions for responsible AI development.</p>
      <h4>Impact on Industries</h4>
      <ul>
        <li>Healthcare: Drug discovery, personalized medicine.</li>
        <li>Finance: Fraud detection, algorithmic trading.</li>
        <li>Creative Arts: Music composition, digital art.</li>
      </ul>
      <p>The future of AI promises both incredible opportunities and significant challenges. Staying informed and engaged is key to navigating this evolving landscape.</p>
    `,
  },
  'newsletter-2': {
    id: 'newsletter-2',
    title: 'Web Development Trends 2024',
    publishDate: '2023-10-19',
    author: 'Sam Frontend',
    contentHtml: `
      <h2>The Era of Server Components</h2>
      <p>React Server Components are set to change how we build performant web applications, blending server-side rendering with client-side interactivity seamlessly.</p>
      <h3>TypeScript Dominance</h3>
      <p>TypeScript continues its ascent as the language of choice for robust and scalable web projects, offering type safety and enhanced developer experience.</p>
      <h4>Edge Computing and CDNs</h4>
      <p>Leveraging edge functions and advanced CDNs is becoming crucial for delivering lightning-fast user experiences globally.</p>
      <p>Keep an eye on WebAssembly for high-performance client-side operations and new CSS features like container queries for more adaptive designs.</p>
    `,
  },
  'newsletter-3': {
    id: 'newsletter-3',
    title: 'Healthy Living: Mind, Body, and Soul',
    publishDate: '2023-10-12',
    author: 'Wellness Guru',
    contentHtml: `
      <h2>Mindfulness in the Digital Age</h2>
      <p>Practicing mindfulness can reduce stress and improve focus. Simple techniques like deep breathing and meditation can be integrated into your daily routine.</p>
      <h3>Nutritional Wisdom</h3>
      <p>Fueling your body with nutrient-rich foods is fundamental. We discuss the benefits of a balanced diet and easy meal prep ideas.</p>
      <h4>The Power of Movement</h4>
      <p>Regular physical activity is vital for both physical and mental health. Discover enjoyable ways to stay active, from yoga to hiking.</p>
      <p>Remember, a holistic approach to health considers all aspects of your well-being. Small, consistent efforts lead to significant results.</p>
    `,
  },
};

/**
 * Simulates an API call delay.
 */
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API Service Functions ---

/**
 * Fetches a list of available newsletters/issues.
 * @returns A promise that resolves to an array of NewsletterListItem.
 */
export async function fetchNewsletters(): Promise<ApiResponse<NewsletterListItem[]>> {
  await simulateDelay(500); // Simulate network latency

  try {
    // In a real application, you would use:
    // const response = await fetch(`${EXTERNAL_CONTENT_API_BASE_URL}`);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const data: NewsletterListItem[] = await response.json();
    // return { success: true, data };

    // Using mock data for demonstration:
    return { success: true, data: MOCK_NEWSLETTERS };
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return { success: false, message: 'Failed to fetch newsletters.', error: (error as Error).message };
  }
}

/**
 * Fetches the detailed content of a specific newsletter issue.
 * @param id The unique identifier of the newsletter.
 * @returns A promise that resolves to a NewsletterContent object.
 */
export async function fetchNewsletterDetail(id: string): Promise<ApiResponse<NewsletterContent>> {
  await simulateDelay(700); // Simulate network latency

  try {
    // In a real application, you would use:
    // const response = await fetch(`${EXTERNAL_CONTENT_API_BASE_URL}/${id}`);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const data: NewsletterContent = await response.json();
    // return { success: true, data };

    // Using mock data for demonstration:
    const newsletter = MOCK_NEWSLETTER_DETAIL[id];
    if (newsletter) {
      return { success: true, data: newsletter };
    } else {
      return { success: false, message: `Newsletter with ID "${id}" not found.`, error: 'Not Found' };
    }
  } catch (error) {
    console.error(`Error fetching newsletter detail for ID ${id}:`, error);
    return { success: false, message: 'Failed to fetch newsletter details.', error: (error as Error).message };
  }
}

/**
 * Submits user subscription details to an external email marketing service.
 * @param payload The subscription details (e.g., email, first name).
 * @returns A promise indicating the success or failure of the subscription.
 */
export async function subscribe(payload: SubscriptionPayload): Promise<ApiResponse<null>> {
  await simulateDelay(1000); // Simulate network latency

  try {
    // In a real application, you would use:
    // const response = await fetch(EXTERNAL_SUBSCRIPTION_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Add any necessary authorization headers here
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!response.ok) {
    //   // Parse error message from response if available
    //   const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    //   throw new Error(`Subscription failed: ${errorData.message || response.statusText}`);
    // }

    // const responseData = await response.json(); // If the subscription service returns data

    // Simulate success
    console.log('Subscription request sent:', payload);
    // You might want to check the email format or other simple client-side validations here
    if (!payload.email || !payload.email.includes('@')) {
      return { success: false, message: 'Invalid email address provided.' };
    }

    // Simulate a successful response from the external service
    return { success: true, message: 'Subscription successful!' };
  } catch (error) {
    console.error('Error submitting subscription:', error);
    return { success: false, message: 'Failed to subscribe. Please try again later.', error: (error as Error).message };
  }
}