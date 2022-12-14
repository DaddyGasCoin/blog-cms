
import { Button } from 'antd';
import Link from 'next/link'


export default function DashBoard() {

    return (
        <div className='flex flex-col gap-4 absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20'>
            <Link href="/home">
                <Button className='bg-neutral-800 p-3 text-slate-50 
                rounded-sm text-3xl h-auto hover:text-neutral-800 hover:bg-slate-50'>
                    New Post
                </Button>
            </Link>
            <Link href="/update">
                <Button className='bg-neutral-800 text-slate-50 p-3 
                rounded-sm text-3xl h-auto  hover:bg-slate-50'>
                    Manage Post's
                </Button>
            </Link>
            <Link href="/delete/comment">
                <Button className='bg-neutral-800 p-3 text-slate-50 
                rounded-sm text-3xl h-auto  hover:bg-slate-50'>
                    Manage Commnets
                </Button>
            </Link>
        </div>
    )
}