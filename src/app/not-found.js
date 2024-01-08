import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="not__found__title">Сторінку не знайдено!</h2>
        <p className="not__found__text">
          Вибачте, не можливо знайти запит за цією адресою.
        </p>
        <Link href="/" className="not__found__link">
          Повернутись на головну.
        </Link>
      </div>
    </section>
  );
}
