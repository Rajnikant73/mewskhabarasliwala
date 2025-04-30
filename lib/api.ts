// This file would typically contain code to fetch data from an API
// For this example, we're simulating API calls with mock data

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  time: string;
  image: string;
  slug: string;
  author?: string;
}

// Sample news data
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'सत्ता गठबन्धनको बैठक सम्पन्न, यस्ता छन् निर्णयहरू',
    excerpt: 'प्रधानमन्त्री पुष्पकमल दाहाल प्रचण्डको अध्यक्षतामा बसेको सत्ता गठबन्धनको बैठकले आगामी दिनमा लिइने नीति तथा कार्यक्रमहरूबारे छलफल गरेको छ।',
    content: 'विस्तृत समाचार...',
    category: 'राजनीति',
    date: '२०८१ साउन ३',
    time: '१० मिनेट अगाडि',
    image: 'https://images.pexels.com/photos/3856643/pexels-photo-3856643.jpeg',
    slug: 'satta-gathabandhan-baithak-sampanna',
    author: 'प्रकाश नेपाल'
  },
  {
    id: 2,
    title: 'नेपाल राष्ट्र बैंकद्वारा नयाँ मौद्रिक नीति सार्वजनिक',
    excerpt: 'नेपाल राष्ट्र बैंकले आर्थिक वर्ष २०८१/८२ को मौद्रिक नीति सार्वजनिक गरेको छ। मौद्रिक नीतिमा मुद्रास्फीति नियन्त्रण र वित्तीय स्थिरताका लागि विशेष नीति तय गरिएको छ।',
    category: 'अर्थतन्त्र',
    date: '२०८१ साउन २',
    time: '२ घण्टा अगाडि',
    image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    slug: 'nrb-monetary-policy',
    author: 'दिपेश शर्मा'
  },
  {
    id: 3,
    title: 'नयाँ शैक्षिक सत्रबाट लागू हुने नयाँ पाठ्यक्रम तयार',
    excerpt: 'शिक्षा मन्त्रालयले आगामी शैक्षिक सत्रदेखि लागू हुने नयाँ पाठ्यक्रम तयार गरेको छ। विद्यार्थीहरूको सीप र क्षमता विकासमा केन्द्रित यो पाठ्यक्रमले शिक्षा प्रणालीमा आमूल परिवर्तन ल्याउने विश्वास गरिएको छ।',
    category: 'शिक्षा',
    date: '२०८१ साउन १',
    time: '१ घण्टा अगाडि',
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg',
    slug: 'naya-shaikshik-satra-curriculum',
    author: 'प्रीति भट्टराई'
  },
  {
    id: 4,
    title: 'सुदूरपश्चिममा भारी वर्षा, जनजीवन प्रभावित',
    excerpt: 'सुदूरपश्चिम प्रदेशमा गएको २४ घण्टामा भारी वर्षा भएको छ। वर्षाका कारण जनजीवन प्रभावित भएको छ भने कयौं स्थानमा बाढी र पहिरोको जोखिम बढेको छ।',
    category: 'वातावरण',
    date: '२०८१ असार ३१',
    time: '३ घण्टा अगाडि',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
    slug: 'sudurpaschim-heavy-rainfall',
    author: 'कृष्ण थापा'
  },
  {
    id: 5,
    title: 'एसिया कप क्रिकेटका लागि नेपाली टोली घोषणा',
    excerpt: 'नेपाल क्रिकेट संघ (क्यान) ले आगामी एसिया कप क्रिकेट प्रतियोगिताका लागि नेपाली राष्ट्रिय क्रिकेट टोली घोषणा गरेको छ। १६ सदस्यीय टोलीको नेतृत्व रोहित पौडेलले गर्नेछन्।',
    category: 'खेलकुद',
    date: '२०८१ असार ३०',
    time: '५ घण्टा अगाडि',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg',
    slug: 'asia-cup-cricket-nepal-team',
    author: 'संजय राई'
  }
];

// Simulated API calls
export async function getAllNews(): Promise<NewsItem[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews);
    }, 500);
  });
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  // In a real app, this would be an API call with a category filter
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredNews = mockNews.filter(
        news => news.category.toLowerCase() === category.toLowerCase()
      );
      resolve(filteredNews);
    }, 500);
  });
}

export async function getNewsById(id: number): Promise<NewsItem | undefined> {
  // In a real app, this would be an API call with an ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const news = mockNews.find(item => item.id === id);
      resolve(news);
    }, 500);
  });
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  // In a real app, this would be an API call with a slug
  return new Promise((resolve) => {
    setTimeout(() => {
      const news = mockNews.find(item => item.slug === slug);
      resolve(news);
    }, 500);
  });
}

export async function getBreakingNews(): Promise<NewsItem[]> {
  // In a real app, this would fetch breaking news based on a flag or category
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews.slice(0, 3));
    }, 500);
  });
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  // In a real app, this would fetch featured news based on a flag
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([mockNews[0]]);
    }, 500);
  });
}

export async function getLatestNews(): Promise<NewsItem[]> {
  // In a real app, this would fetch latest news sorted by date
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedNews = [...mockNews].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      resolve(sortedNews);
    }, 500);
  });
}