import {
  ErrorLayout,
  ErrorTitle,
  ErrorDescription,
  ErrorLogo,
} from "../components/styles/layout/ErrorPageLayout";

function Error() {
  return (
    <ErrorLayout>
      <ErrorLogo src="/404.png" alt="404" />
      <ErrorTitle>Page not found</ErrorTitle>
      <ErrorDescription>
        We're sorry, the page you requested could not be found. Please go back
        to the homepage.
      </ErrorDescription>
    </ErrorLayout>
  );
}

export default Error;
