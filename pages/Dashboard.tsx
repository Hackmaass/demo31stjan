import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar 
} from 'recharts';
import { Activity, Moon, Flame, Footprints, ArrowRight, Zap } from 'lucide-react';
import { getHealthInsight } from '../services/geminiService';

const mockHeartData = [
  { name: '12 AM', value: 62 }, { name: '4 AM', value: 58 }, { name: '8 AM', value: 75 },
  { name: '12 PM', value: 85 }, { name: '4 PM', value: 92 }, { name: '8 PM', value: 78 },
  { name: '11 PM', value: 65 }
];

const mockStepsData = [
  { name: 'Mon', value: 4500 }, { name: 'Tue', value: 8200 }, { name: 'Wed', value: 10500 },
  { name: 'Thu', value: 7600 }, { name: 'Fri', value: 9100 }, { name: 'Sat', value: 12000 },
  { name: 'Sun', value: 6800 }
];

export const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('Analyzing your daily metrics...');

  useEffect(() => {
    // Generate an insight on mount
    getHealthInsight([
        { type: 'Steps', value: 8240 },
        { type: 'Sleep', value: '7h 20m' },
        { type: 'Avg Heart Rate', value: 72 }
    ]).then(setInsight);
  }, []);

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-gray-500 font-medium text-lg mb-1">Thursday, Nov 14</h2>
          <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight">Summary</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* AI Insight Banner */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-1 shadow-lg shadow-indigo-500/20">
        <div className="relative bg-white/10 backdrop-blur-md rounded-[20px] p-6 flex items-start gap-4">
           <div className="p-3 bg-white/20 rounded-full text-white">
              <Zap size={24} fill="currentColor" />
           </div>
           <div>
              <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-1">Daily Insight</h3>
              <p className="text-white font-medium text-lg leading-snug">{insight}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Activity Card */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                    <Footprints size={20} />
                </div>
                <span className="text-lg font-bold text-gray-900">Activity</span>
             </div>
             <span className="text-gray-400 text-sm font-medium">Weekly</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockStepsData}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#86868B', fontSize: 12}} 
                    dy={10}
                />
                <Tooltip 
                    cursor={{fill: '#F5F5F7'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar 
                    dataKey="value" 
                    fill="#FF9500" 
                    radius={[6, 6, 6, 6]} 
                    barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 rounded-full text-rose-600">
                    <Activity size={20} />
                </div>
                <span className="text-lg font-bold text-gray-900">Heart Rate</span>
             </div>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-gray-900">72</span>
            <span className="text-gray-500 font-medium">BPM</span>
          </div>

          <div className="flex-1 min-h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHeartData}>
                <defs>
                  <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F43F5E" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHeart)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Moon size={20} />
                </div>
                <span className="text-lg font-bold text-gray-900">Sleep</span>
            </div>
            <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">7<span className="text-xl text-gray-500">h</span> 20<span className="text-xl text-gray-500">m</span></span>
            </div>
            <div className="flex gap-2">
                {[1,2,3,4,5,6,7].map((_, i) => (
                    <div key={i} className="flex-1 h-24 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div 
                            className="absolute bottom-0 w-full bg-blue-500 rounded-lg" 
                            style={{height: `${Math.random() * 60 + 20}%`}}
                        ></div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-sm text-gray-500 flex justify-between">
                <span>22:00</span>
                <span>06:00</span>
            </div>
        </div>

         {/* Calories Card */}
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                        <Flame size={20} />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-gray-900 block">Active Energy</span>
                        <span className="text-gray-400 text-sm">Goal: 600 kcal</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">480</span>
                    <span className="text-gray-500 text-sm block">kcal</span>
                </div>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="mt-4">
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-[80%] shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
                You're burning more calories than usual today. Keep it up!
            </p>
        </div>
        
      </div>
    </div>
  );
};
