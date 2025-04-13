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
    // 
    // To use custom images for the splash screen:
    // 1. Create a directory: public/splash-screen/
    // 2. Add your images to this directory
    // 3. Update the images array below with the paths to your images
    //
    const images = [
        '01.webp',
        '02.jpg',
        '03.jpg',
        '04.png',
        '05.webp',
        '06.jpg',
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950">
            {/* Diagonal image arrangement */}
            <div className="absolute inset-0 w-screen h-screen overflow-hidden">
                <div className="relative w-full h-full">
                    {images.map((img, index) => {
                        // Calculate diagonal position from left to right
                        const row = Math.floor(index / 1.5);
                        const col = index % 3;
                        const offsetX = col * 40.88;
                        const offsetY = row * 40.88;
                        
                        // Position images diagonally from left to right
                        const x = offsetX;
                        const y = offsetY;
                        
                        return (
                            <div 
                                key={index}
                                className="absolute overflow-hidden"
                                style={{
                                    left: `${x+30}%`,
                                    top: `${y}%`,
                                    transform: `translate(-50%, -50%) rotate(${index * 10}deg)`,
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                <img 
                                    src={`/splash-screen/${img}`} 
                                    alt={`Splash image ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Darkened/blurred overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            {/* Centered content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                {/* App name with enhanced visibility */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
                    {appName}
                </h1>
                
                {/* Description */}
                <p className="text-xl md:text-2xl text-white/90 max-w-md font-medium">
                    {description || "Preparing something amazing for you..."}
                </p>
                
                {/* Simple loading indicator */}
                <div className="mt-8 flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

