import { ArrowLeft } from 'lucide-react'
import { To, useNavigate, } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FC } from 'react'

const NavigateBack: FC<{to?: To}> = ({to}) => {
    const navigate = useNavigate()
    const location = to || -1 as To
    return (
        <Button variant='link' onClick={() => navigate(location)} className="inline-flex items-center text-sm font-medium text-primary mb-6 pl-0 decoration-transparent">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
        </Button>
    )
}

export default NavigateBack