export const renderHighlightedText = (text: string, query: string) => {
  if (query === "") {
    return <span>{text}</span>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let lastIndex = 0;
  const parts: React.ReactNode[] = [];

  while (lastIndex < text.length) {
    const index = lowerText.indexOf(lowerQuery, lastIndex);
    if (index === -1) {
      parts.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
      break;
    }

    parts.push(
      <span key={`text-${lastIndex}-${index}`}>
        {text.substring(lastIndex, index)}
      </span>
    );
    parts.push(
      <strong key={`highlight-${index}`} style={{ fontWeight: "bold" }}>
        {text.substring(index, index + query.length)}
      </strong>
    );

    lastIndex = index + query.length;
  }

  return parts;
};

export const allUsers = [
  {
    id: 1,
    name: "Bhargav",
    email: "bhargav@gmail.com",
    imageUrl: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f",
  },
  {
    id: 2,
    name: "Saketh",
    email: "saketh@gmail.com",
    imageUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg",
  },
  {
    id: 3,
    name: "Prasanna",
    email: "prasanna@gmail.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_SEpxJE_9PCTfFmp2RAx9rGL7BB56rJSh1sPSlMj4Q&s",
  },
  {
    id: 4,
    name: "SuVaisnav",
    email: "suvaisnav@gmail.com",
    imageUrl:
      "https://i.dailymail.co.uk/i/pix/2016/08/05/14/36E80BDE00000578-3725482-image-a-74_1470405453388.jpg",
  },
  {
    id: 5,
    name: "Siddu",
    email: "siddu@gmail.com",
    imageUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg",
  },
  {
    id: 7,
    name: "Rutvik",
    email: "rutvik@gmail.com",
    imageUrl: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f",
  },
  {
    id: 6,
    name: "Thrisank",
    email: "thrisank@gmail.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_SEpxJE_9PCTfFmp2RAx9rGL7BB56rJSh1sPSlMj4Q&s",
  },
];
