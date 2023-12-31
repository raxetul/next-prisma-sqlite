import { lusitana } from '@/components/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none `}
    >
      <Image src="/android-chrome-192x192.png"
      width={48}
      height={48}
      alt="Picture of the author">

      </Image>
      <p className="text-[44px]">App</p>
    </div>
  );
}
