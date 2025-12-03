import { CloudUploadIcon, SquareDashedBottomCodeIcon } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full sticky text-white top-0 left-0 pt-5 pb-5 bg-red-400 pl-5 pr-5 md:pl-60 md:pr-60 flex justify-between items-center">

            <div className="flex gap-5 items-center">
                <CloudUploadIcon color="white" size={50} />
                <div className="flex flex-col">
                    <span className="font-semibold">UPLOAD-LABS</span>
                    <span className="text-[12px]">by <a href="https://www.instagram.com/luciano_mendesz9" className="underline" target="_blank">@luciano_mendesz9</a></span>
                </div>
            </div>

            <a href="#" target="_blank" className="hover:underline cursor-pointer flex items-center gap-3"><SquareDashedBottomCodeIcon size={30} /> <span className="md:flex hidden">Documentação - API</span></a>

        </nav>
    )
}