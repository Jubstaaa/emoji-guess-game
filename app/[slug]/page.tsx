import { categories } from "../../data/categories";
import { Metadata } from "next";
import GamePage from "../../components/GamePage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} - Emoji Guess Game`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Emoji Guess Game`,
      description: category.description,
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return <GamePage category={category} />;
}
