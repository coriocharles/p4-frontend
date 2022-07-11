import React from 'react'

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props}) {
        if (!isLoading) return <Component {...props} />
        
        return (
            <p>
                Data still loading
            </p>
        )
    }
}

export default PostLoading