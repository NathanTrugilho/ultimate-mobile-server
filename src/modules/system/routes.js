const express = require('express');
const router = express.Router();
const os = require('os');
const fs = require('fs');

router.get('/info', (req, res) => {
    try {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        
        // Convert to GB
        const usedRamGB = (usedMem / (1024 * 1024 * 1024)).toFixed(2);
        const availableRamGB = (freeMem / (1024 * 1024 * 1024)).toFixed(2);
        
        // Fetch battery natively from Android/Linux system files
        let batteryLevel = 'N/A';
        try {
            batteryLevel = fs.readFileSync('/sys/class/power_supply/battery/capacity', 'utf8').trim() + '%';
        } catch (err) {
            // Fallback for when you are testing on your PC
            batteryLevel = 'Not Available (PC)';
        }
        
        const data = {
            uptime: os.uptime(),
            battery: batteryLevel,
            ramUsage: `${usedRamGB} GB / ${availableRamGB} GB` // Used/Available format
        };
        
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read system data.', details: error.message });
    }
});

module.exports = router;