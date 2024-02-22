import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string;
  src: string;
  slug: string;
};

const CoverImage = ({title, src, slug}: Props) => {
  return (
    <div className="sm:mx-0">
      <Link href={slug} aria-label={title}>
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          className={cn('shadow-sm w-full', {
            'hover:shadow-lg transition-shadow duration-200': slug,
          })}
          width={1300}
          height={630}
        />
      </Link>
    </div>
  );
};

export default CoverImage;
