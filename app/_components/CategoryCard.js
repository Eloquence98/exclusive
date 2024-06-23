function CategoryCard({ category }) {
  return (
    <div className="transition-default flex flex-col items-center justify-center rounded border border-border bg-white py-4 hover:bg-primary">
      👕
      <p> {category} </p>
    </div>
  );
}

export default CategoryCard;
