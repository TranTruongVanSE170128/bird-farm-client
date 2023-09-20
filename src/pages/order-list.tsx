import React, { useState, useRef, useEffect } from 'react';
import Container from '@/components/ui/container';

function OrderList() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const tabItems = ['Tất cả', 'Đang xử lí', 'Đang giao', 'Hoàn thành', 'Đã hủy'];
  const [barStyle, setBarStyle] = useState({ left: '0%', width: `${100 / tabItems.length}%` });

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  
  const handleTabClick = (tab: string, index: number) => {
    setActiveTab(tab);
    const tabWidthPercentage = 100 / tabItems.length;
    const barPosition = index * tabWidthPercentage;
    setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` });
  };


  const handleTabMouseLeave = () => {
    if (!tabRefs.current) return;
    const activeTabIndex = tabItems.indexOf(activeTab);
    const tabWidthPercentage = 100 / tabItems.length;
    const barPosition = activeTabIndex * tabWidthPercentage;
    setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` });
  };

 
  useEffect(() => {
    setActiveTab('Tất cả');
  }, []);

  return (
    <main>
      <Container>
        <div className='w-full h-12 bg-white shadow-md relative'>
          <div className='bg-purple-500 h-1 absolute bottom-0 transition-all duration-300' style={barStyle}></div>
          <ul className='flex justify-around h-full items-center'>
            {tabItems.map((tab, index) => (
              <li
                key={tab}
                className={`cursor-pointer hover:text-purple-500 ${
                  activeTab === tab ? 'text-purple-500' : 'text-gray-600'
                }`}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleTabClick(tab, index)} 
                onMouseLeave={handleTabMouseLeave} 
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
       
      </Container>
    </main>
  );
}

export default OrderList;
