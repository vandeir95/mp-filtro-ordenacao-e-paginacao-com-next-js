'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { use } from 'react';
import { handler } from 'tailwindcss-animate';

type PaginationProps = {
  links:{
    url: string ;
    label: string ;
    active: boolean ;

    id: number;
  }[];

  lastPage: number
  
  }

export default function Pagination({links, lastPage}:PaginationProps) {

  const searchParams = useSearchParams()

  const pathname = useParams()

  const {replace} = useRouter()

  function handlerClickPage(pageNumber: number) {

    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1 ){
      params.set('page', pageNumber.toString());

      if (pageNumber > lastPage ){
        params.set('page', lastPage.toString());
      }else{
      params.set('page', pageNumber.toString())
    }
    
    
    } else{
      params.delete('page')
    }



    replace(`${pathname}?${params.toString()}`, {scroll: false} );
  }


  return (
    <PaginationComponent >
      <PaginationContent className="flex gap-4 md:gap-4 justify-center">

    <PaginationItem 
          className= {`${links[0].url ? 'cursor-pointer' : 'cursor-auto tex-slate-300' }`}


    onClick={()=>handlerClickPage(Number(searchParams.get('page') )-1)} >

      

         </PaginationItem>
        

        {links.map(link =>{
          if(link.label.includes('Previous') || link.label.includes('Next')){

            return null
          }


          if(link.label === '...'){
            return(
                 <PaginationItem  key={link.id} className="hidden md:inline-flex">
        
        </PaginationItem>

            )
          }

       


          return(
            <PaginationItem key={link.id} className='cursor-pointe' >

            <PaginationLink 
            onClick={() => handlerClickPage(Number(link.label))}
            isActive={link.active}
            dangerouslySetInnerHTML={{ __html: link.label }}
            >
               </PaginationLink>

            </PaginationItem>

          )



        })}

      <PaginationItem  
      className= {`${links[links.length -1].url ? 'cursor-pointer' :  'cursor-auto tex-slate-300 hover:text-slate-300 hover:text-slate-300' }`}
      
      onClick={()=>handlerClickPage(Number(searchParams.get('page') )+1)} >

           

              </PaginationItem>

        
        {/* <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>8</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>9</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem> */}
      </PaginationContent>
    </PaginationComponent>
  );
}
