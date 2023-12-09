import React, {useState} from 'react'

const Results = () => {
    const [predictionResult, setPredictionResult] = useState({
        accuracy: 0.85,
        precision: 0.78,
        recall: 0.82,
    });

    return (
        <div className="bg-white rounded-lg p-10 ml-6">
            <div className="container mx-auto">
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-2">Prediction Result Metrics</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                    <p>Accuracy: {predictionResult.accuracy}</p>
                    <p>Precision: {predictionResult.precision}</p>
                    <p>Recall: {predictionResult.recall}</p>
                    {/* You can add more metrics as needed */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results