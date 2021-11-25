import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/disney.png';

const Nav = ({ account }) => {

    const urlAvatar = account.avatar.url;

    return (
        <div>
            <div className="account-info flex h-1/2 p-2 justify-around">
                {/* eslint-disable-next-line @next/next/link-passhref */}
                <Link href="/"><Image src={logo} alt="Disney" width={90} height={60} /></Link>
                <div className="flex">
                    <p className="flex items-center">Welcome {account.username}</p>
                    <Image className="avatar rounded-full ml-2" src={urlAvatar} alt={urlAvatar} width={50} height={50} priority={true}
                        quality={85} />
                </div>
            </div>
        </div>
    );
};

export default Nav;