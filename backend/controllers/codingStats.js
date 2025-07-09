

// wakaTime api

const getCodingStats = async (req, res) => {

    try{

        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).slice(0, 10); // YYYY-MM-DD

        console.log(today);

        const response = await fetch(`https://wakatime.com/api/v1/users/current/durations?date=${today}`, {
            headers: {
                Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`

            }
        });
        if(!response.ok) {
            return res.status(400).json({error: 'Unable to fetch wakaTime stats'})
        }
        const data = await response.json();

        // no coding done yet
        if (data.data.length === 0) {
             return res.status(200).json({ message: "No coding activity yet today." });
        }

        console.log(data);

        // total minutes
        let totalSeconds = 0;
        data.data.forEach((d) => {
            totalSeconds += d.duration;
        })

        const totalMins = Math.floor(totalSeconds / 60);

        // per project duration
        let perProject = {};
        data.data.forEach(({project, duration}) => {
            // if already there ==> add the extra duration 
            if(!perProject[project]) {
                perProject[project] = duration;
            }
            else {
                perProject[project] += duration;
            }
        })
        // get all of them into seconds (didnt do that while adding cause it decreased time) minimize precision loss (especially if durations are small but frequent).
        Object.keys(perProject).forEach((project) => {
            perProject[project] = Math.floor(perProject[project] / 60);
        });

        // active time range
        const start = new Date(data.data[0].time * 1000); // converting to ms then to Date
        const stop = new Date(data.data[data.data.length - 1].time * 1000);

        // Format times
        const formatTime = (date) =>
        date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const startedAt = formatTime(start);
        let stoppedAt;
        if(data.data.length === 1) {
            stoppedAt = formatTime(new Date(stop.getTime() + totalMins * 60 * 1000));
        }
        else {
            stoppedAt = formatTime(stop);
        }

        const stats = {
            totalMins: totalMins,
            perProject: perProject,
            startedAt: startedAt,
            stoppedAt: stoppedAt
        }

        res.status(200).json(stats);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export {getCodingStats};