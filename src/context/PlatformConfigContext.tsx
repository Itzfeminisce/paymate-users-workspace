import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { usePlatformConfigQuery } from '@/hooks/api-hooks';

interface PlatformConfigContextType {
    config: Record<string, any> | null;
    isLoading: boolean;
    error: Error | null;
    getConfig: (name: string) => any;
    refetch: () => Promise<any>;
}

const PlatformConfigContext = createContext<PlatformConfigContextType | undefined>(undefined);

export function usePlatformConfig() {
    const context = useContext(PlatformConfigContext);
    if (context === undefined) {
        throw new Error('usePlatformConfig must be used within a PlatformConfigProvider');
    }
    return context;
}

export function PlatformConfigProvider({ children }: { children: ReactNode }) {
    const { data, error, isLoading, refetch } = usePlatformConfigQuery();

    const getConfig = useCallback((name: string) => {
        const config = data.find(it => it.name == name)
        if (!config) throw new Error(`Config name not found: ${name}`)

        return config.config
    }, [data])



    if (isLoading) {
        return (<SplashScreen appName={'PayMate'} description={'Giving better experience...'} />);
    }

    if (error) {
        return (
            <div className="app-loader">
                <div className="loader-spinner"></div>
                <p>Error loading configuration...</p>
            </div>
        )
    }


    const value = {
        config: data || null,
        isLoading,
        error: error as Error | null,
        getConfig,
        refetch
    };



    return (
        <PlatformConfigContext.Provider value={value}>
            {children}
        </PlatformConfigContext.Provider>
    );
}

export default PlatformConfigContext;


export const SplashScreen: React.FC<{ appName: string, description?: string }> = ({ appName, description }) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 px-4 sm:px-6 from-slate-900 via-indigo-950 to-violet-900 bg-[url('/splash-pattern.svg')] bg-cover bg-center bg-blend-soft-light">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(101,163,255,0.3),transparent_70%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,101,209,0.3),transparent_70%)]"></div>
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 md:mb-8">
                <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute overflow-hidden inset-0 border-4 border-transparent border-r-fuchsia-400/60 rounded-full animate-pulse">
                    <img src='/og-image.png' className='w-full h-full' />
                </div>
                <div className="absolute inset-1/4 bg-cyan-400/10 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 animate-pulse">
                {appName}
            </h1>
            <p className="text-black/80 text-sm sm:text-base md:text-lg text-center">
                <span className="inline-block animate-bounce">✨</span> {description || "Preparing something amazing for you..."} <span className="inline-block animate-bounce delay-150">✨</span>
            </p>
        </div>
    );
};

