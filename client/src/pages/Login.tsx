import {
  LoginPageLayout,
  HeroSection,
  FormSection,
  HeroImg,
  HeroTitle,
  HeroDescription,
} from "../components/styles/layout/LoginPageLayout";
import UserForm from "../components/user/UserForm";

function Login() {
  return (
    <LoginPageLayout>
      <HeroSection>
        <HeroImg src="/Build.png" alt="hero" />
        <HeroTitle>Trackero</HeroTitle>
        <HeroDescription>
          The ultimate issue tracking app for all your project management needs.
          With Trackero, you can easily track, prioritize and resolve issues,
          bugs and tasks in one central location.
        </HeroDescription>
      </HeroSection>
      <FormSection>
        <UserForm />
      </FormSection>
    </LoginPageLayout>
  );
}

export default Login;
