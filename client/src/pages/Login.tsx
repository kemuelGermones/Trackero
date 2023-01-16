import {
  FrontPageLayout,
  HeroSection,
  FormSection,
  HeroImg,
  HeroTitle,
  HeroDescription,
} from "../components/styles/layout/FrontPageLayout";
import UserForm from "../components/user/UserForm";

function Login() {
  return (
    <FrontPageLayout>
      <HeroSection>
        <HeroImg src="/Build.png" alt="hero" />
        <HeroTitle>Trackero</HeroTitle>
        <HeroDescription>
          The ultimate issue tracking app for all your project management needs.
          With TrackIt, you can easily track, prioritize and resolve issues,
          bugs and tasks in one central location.
        </HeroDescription>
      </HeroSection>
      <FormSection>
        <UserForm />
      </FormSection>
    </FrontPageLayout>
  );
}

export default Login;
