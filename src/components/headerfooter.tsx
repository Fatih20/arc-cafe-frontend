import Header from './home/header';
import Footer from './home/footer';

export default function HeaderFooter({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
