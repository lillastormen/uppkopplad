
import type { Request, Response } from "express";
import type { chartData } from "../types/chart.ts";
import { getUSerAccuracyByCategory } from "../repositories/mysql/chartRepository.ts";

export async function getAccuracy(req: Request, res: Response) {

    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "Not authenticated",
        });
    }    

    try {
        const data = await getUSerAccuracyByCategory(userId) as chartData[];

        const formattedData = data.map((d: chartData) => ({
            category: d.category,
            accuracy: d.total === 0
                ? 0
                : Math.round((d.correct / d.total) * 100)
        }));

        console.log(formattedData)
        
        res.json(formattedData);
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch chart data'
        })
    }

}