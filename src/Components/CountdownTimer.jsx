import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CountdownTimer = ({ targetTimestamp ,label=null}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    if (!targetTimestamp) return null;

    const now = Math.floor(Date.now() / 1000);
    const diff = targetTimestamp - now;

    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (24 * 3600)),
      hours: Math.floor((diff % (24 * 3600)) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  if (!timeLeft) return null;

  const formatTime = (value) =>
    value.toString().padStart(2, "0");

  return (
    <div className="flex justify-center items-center bg-[#1E293B] p-4 rounded-lg">
      <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
                    {label||""}
                  </Typography>
    <Typography
            variant="h4"
            sx={{ color: '#E2E8F0', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '3px', mb: 0.5 }}
          >
        {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
        {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </Typography>
    </div>
  );
};

export default CountdownTimer;
