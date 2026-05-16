import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex justify-center py-10">
      <SignUp 
        routing="path"
        path="/register"
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#FFC000] hover:bg-[#917300] text-black font-bold uppercase rounded-none transition-colors",
            card: "bg-[#202020] border border-[#202020] rounded-none shadow-2xl",
            headerTitle: "text-white uppercase font-bold text-2xl tracking-tight",
            headerSubtitle: "text-[#7D7D7D] text-sm",
            socialButtonsBlockButton: "rounded-none border border-[#202020] bg-[#000000] text-white hover:bg-[#202020] transition-colors",
            dividerLine: "bg-[#202020]",
            dividerText: "text-[#555555] uppercase text-[10px] font-bold",
            formFieldLabel: "text-[#7D7D7D] uppercase text-xs font-bold tracking-wider",
            formFieldInput: "rounded-none border border-[#202020] bg-[#000000] text-white focus:border-[#FFC000] focus:ring-0 transition-colors",
            footerActionLink: "text-[#FFC000] hover:text-[#917300] transition-colors font-bold",
            formHeaderTitle: "text-white",
            formHeaderSubtitle: "text-[#7D7D7D]",
          }
        }} 
      />
    </div>
  );
}
