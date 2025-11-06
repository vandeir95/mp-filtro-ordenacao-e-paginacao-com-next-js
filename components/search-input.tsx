'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams,usePathname,useRouter } from 'next/navigation';


export default function SearchInput() {

  const searchParams = useSearchParams()

  const pathame = usePathname()
  const {replace} = useRouter()



function handlechange(evente: React.ChangeEvent<HTMLInputElement>) {

  const params = new URLSearchParams(searchParams)

  const searchString = evente.currentTarget.value;

  if(searchString) {
    params.set('search', searchString)

  } else{
    params.delete('search')
  }

  replace(`${pathame}?${params.toString()}`);

   } 



  






  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={handlechange}
      />
    </div>
  );
}
