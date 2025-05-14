import AuthForm from "@/components/AuthForm";
import { signup } from "@/app/actions/auth";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page() {
  const handleSubmit = async (formData: FormData) => {
    const res = await signup(formData);
  };

  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-4xl">Sign Up</CardTitle>
        </CardHeader>
        <AuthForm type="signup" />
      </Card>
    </div>
  );
}
