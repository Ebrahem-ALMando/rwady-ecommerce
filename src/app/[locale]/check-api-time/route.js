export const runtime = 'edge';

export async function GET() {
    const start = Date.now();

    try {
        const response = await fetch('https://rawady.brainsoftsolutions.com/api/top-sliders');
        const data = await response.json();
        const duration = Date.now() - start;

        return new Response(JSON.stringify({
            success: true,
            duration,
            count: data?.data?.length || 0,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
