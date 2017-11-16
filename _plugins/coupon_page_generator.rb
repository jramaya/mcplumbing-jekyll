require 'pry-byebug'

module Jekyll
  class CouponPage < Page
    def initialize(site, base, dir, coupon)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'coupon.html')
      self.data['coupon'] = coupon

      self.data['title'] = coupon['title']
    end
  end

  class CouponPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'coupon'
        dir = site.config['coupon_dir'] || 'coupons'
        site.data['coupons'].each do |coupon|
          site.pages << CouponPage.new(site, site.source, File.join(dir, coupon['permalink']), coupon)
        end
      end
    end
  end
end
