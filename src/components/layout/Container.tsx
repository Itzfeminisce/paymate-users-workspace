import React, { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import NavigateBack from '../ui/navigate-back';
import { To } from 'react-router-dom';


interface ContainerProps extends PropsWithChildren {
    title: string;
    description: string;
    enableBackButton?: boolean;
    backButtonLocation?: To;
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const Container: FC<ContainerProps> = ({ children, backButtonLocation, enableBackButton, description, title, className }) => {
    return (
        <div className={cn('md:pl-64 pb-5', className)}>
            <div className="container mx-auto px-4">
                {enableBackButton && <NavigateBack to={backButtonLocation}/>}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {title && description && (
                        <motion.div variants={fadeUp}>
                            <h1 className="text-3xl font-bold">{title}</h1>
                            <p className="text-muted-foreground mt-2">
                                {description}
                            </p>
                        </motion.div>
                    )}
                    {children}
                </motion.div>
            </div>
        </div>
    )
}

export default Container